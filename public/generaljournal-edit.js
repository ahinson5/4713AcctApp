import { ShowLoggedInUserInfo, ParseCSV, GetUniqueID } from "./MyUtil";
import { app } from "./firebaseinit";
import { ref, getDatabase, set, get, child } from "firebase/database"

var saveDataButton = document.querySelector('#GeneralJournalSaveBtn');
var errorLabel = document.querySelector("#genJournalEditErrorLabel");

window.addEventListener("load", () => {
    ShowLoggedInUserInfo();
    ReadCoaFromDB();
});

saveDataButton.addEventListener("click", () => {
    WriteCoaToDB().then(() => {
        ReadCoaFromDB();
    });
});


function ValidateDebitsAndCredits(dcsv, ccsv, rowNum){
    
    var debits = dcsv.split(",");
    var credits = ccsv.split(",");
    if(debits[1] === credits[0] && debits[0] === credits[1]){
        errorLabel.textContent = "";
        return true;
    } else{
        const message = `Error! Entry on row ${rowNum} rejected. Debits and credits MUST match.`;
        PostErrorLogToDB(message);
        errorLabel.textContent = message;
        return false;
    }
}

async function PostErrorLogToDB(message){
    const date = new Date();
    set(ref(getDatabase(app), `ErrorLogs/${GetUniqueID()}`), {
        Date: date.toLocaleString(),
        User: sessionStorage.getItem("currentUser"),
        Message: message
    });
}

function ValidateAccountName(count, rowNum){
    if(count >= 2){
        errorLabel.textContent = "";
        return true;
    } else{
        const message = `Error! Entry on row ${rowNum} rejected. One of the entered accounts does not exist. Double check your spelling.`;
        PostErrorLogToDB(message);
        errorLabel.textContent = message;
        return false;
    }
}

function IsInputArrayBlank(arr){
    for(var i  = 0; i < arr.length; i++){
        if(arr[i] != ""){
            return false;
        }
    }
    return true;
}

//Grabs all the data from the HTML table's input fields and writes them to the Realtime Database.
async function WriteCoaToDB() {
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");
    const dbRef = ref(getDatabase(app));

    for (var i = 1; i < rows.length; i++) {
        console.log = i;
        const inputs = rows[i].getElementsByTagName("input");

        const data = [];
        for (const input of inputs) {
            data.push(input.value);
        }
        if (!IsInputArrayBlank(data)) {

            if(!ValidateDebitsAndCredits(data[3], data[4], i)){
                return;
            }
            var nameArr = data[1].split(",");

            const coaProm = await get(child(dbRef, `COA`));
            var postRefNo = "";
            var count = 0;
            for (var j = 0; j < nameArr.length; j++) {
                coaProm.forEach((child) => {
                    if (child.val().Title === nameArr[j]) {
                        count++;
                        postRefNo += child.val().No;
                        if (j < nameArr.length - 1) {
                            postRefNo += ",";
                        }
                    }
                });
            }
            if(!ValidateAccountName(count, i)){
                return;
            }

            const journalProm = await get(child(dbRef, `Journal/Entry${i}`));
            var approvalStatus = "Pending";
            if(journalProm.exists() && !HasGenJournalChanged(journalProm, data)){
                approvalStatus = journalProm.val().Approved;
            }
            set(ref(getDatabase(app), `Journal/Entry${i}`), {
                Date: data[0],
                Accounts: data[1],
                Description: data[2],
                Debits: data[3],
                Credits: data[4],
                PostRef: postRefNo,
                Approved: approvalStatus
            });
        }
    }
}

function HasGenJournalChanged(snapshot, data){

    if(snapshot.val().Date != data[0] || snapshot.val().Accounts != data[1] || snapshot.val().Description != data[2] || snapshot.val().Debits != data[3] || snapshot.val().Credits != data[4]){
        return true;
    } else{
        return false;
    }
}

//For each piece of data fetched from the Realtime Database, update the corresponding HTML table elements.
function ReadCoaFromDB() {
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `Journal`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const inputs = rows[i].getElementsByTagName("input");
            const data = rows[i].getElementsByTagName("td");

            inputs[0].value = child.val().Date;
            inputs[1].value = child.val().Accounts;
            inputs[2].value = child.val().Description;
            inputs[3].value = child.val().Debits;
            inputs[4].value = child.val().Credits;
            if (child.val().Approved === "Approved") {
                data[5].textContent = child.val().PostRef;
            }
            i++;
        });

        var j = 1;
        snapshot.forEach((child) => {
            const buttons = rows[j].getElementsByTagName("button");
            var color = "";
            var status = "";
            if (child.val().Approved === "Pending") {
                color = "#b7af68";
                status = "Pending";
            } else if (child.val().Approved === "Approved") {
                color = "#748B75";
                status = "Approved";
            } else {
                color = "#B76D68";
                status = "Not Approved";
            }
            buttons[0].style.background = color;
            buttons[0].textContent = status;
            j++;
        });
    });
}
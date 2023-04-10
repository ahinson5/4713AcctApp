import { ShowLoggedInUserInfo, ParseCSV } from "./MyUtil";
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
        errorLabel.textContent = `Error! Entry on row ${rowNum} rejected. Debits and credits MUST match.`;
        return false;
    }
}

function ValidateAccountName(count, rowNum){
    if(count >= 2){
        errorLabel.textContent = "";
        return true;
    } else{
        errorLabel.textContent = `Error! Entry on row ${rowNum} rejected. One of the entered accounts does not exist. Double check your spelling.`;
        return false;
    }
}

//Grabs all the data from the HTML table's input fields and writes them to the Realtime Database.
async function WriteCoaToDB() {
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");
    const dbRef = ref(getDatabase(app));

    for (var i = 1; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName("input");

        const data = [];
        for (const input of inputs) {
            if (input.value) data.push(input.value);
        }
        if (data && data.length != 0) {

            if(!ValidateDebitsAndCredits(data[2], data[3], i)){
                return;
            }
            var nameArr = data[1].split(",");

            const snapshot = await get(child(dbRef, `COA`));
            var postRefNo = "";
            var count = 0;
            for (var j = 0; j < nameArr.length; j++) {
                snapshot.forEach((child) => {
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
            set(ref(getDatabase(app), `MyJournal/Entry${i}`), {
                Date: data[0],
                Accounts: data[1],
                Debits: data[2],
                Credits: data[3],
                PostRef: postRefNo,
                Approved: "Pending"
            });
        }
    }
}

//For each piece of data fetched from the Realtime Database, update the corresponding HTML table elements.
function ReadCoaFromDB() {
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `MyJournal`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const inputs = rows[i].getElementsByTagName("input");
            const data = rows[i].getElementsByTagName("td");

            inputs[0].value = child.val().Date;
            inputs[1].value = child.val().Accounts;
            inputs[2].value = child.val().Debits;
            inputs[3].value = child.val().Credits;
            if (child.val().Approved === "Approved") {
                data[4].textContent = child.val().PostRef;
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
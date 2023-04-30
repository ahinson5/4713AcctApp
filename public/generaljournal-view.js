import {ShowLoggedInUserInfo, ParseCSV, CheckRole } from "./MyUtil";
import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, set} from "firebase/database";     

window.addEventListener("load", () => {
    ShowLoggedInUserInfo();
    CheckRole("entryApprovalBtn");
    ReadTableFromDatabase();
});

//Listen to the account title's click event.
var accountAnchors = document.querySelectorAll(".postRef");
accountAnchors.forEach(element => {
    element.addEventListener("click", () => {
        ParseAnchor(element);
    })
});

//Store the account title's link you clicked and navigate to the ledger HTML page.
function ParseAnchor(element){
    window.sessionStorage.setItem("accountAnchorName", element.innerHTML);
    window.location = "./account-view.html";
}

//For each piece of data fetched form the DB, update the HTML table values.
function ReadTableFromDatabase(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("GeneralJournalViewTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `Journal`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const cols = rows[i].getElementsByTagName("td");
            for(var j = 0; j < cols.length - 1; j++){
                cols[0].textContent = child.val().Date;
                cols[1].textContent = ParseCSV(child.val().Accounts);
                cols[2].textContent = child.val().Description;
                cols[3].textContent = ParseCSV(child.val().Debits);
                cols[4].textContent = ParseCSV(child.val().Credits);
                if(child.val().Approved === "Approved"){
                    cols[5].getElementsByTagName("a")[0].textContent = child.val().PostRef.split(",")[0];
                    cols[5].getElementsByTagName("a")[1].textContent = child.val().PostRef.split(",")[1];
                }
            }
            i++;
        });

        //Change the button color according to the Approved value stored in the database.
        var j = 1;
        snapshot.forEach((child) => {
            const buttons = rows[j].getElementsByTagName("button");
            var color = "";
            var status = "";
            if(child.val().Approved === "Pending"){
                color = "#b7af68";
                status = "Pending";
            } else if (child.val().Approved === "Approved"){
                color = "#748B75";
                status = "Approved";
            } else{
                color = "#B76D68";
                status = "Rejected";
            }
            buttons[0].style.background = color;
            buttons[0].textContent = status;
            j++;
        });

    });
}
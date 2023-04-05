import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, set} from "firebase/database";               
import { ShowLoggedInUserInfo, CheckRole } from "./MyUtil";

window.addEventListener('load', (event) => {
    ShowLoggedInUserInfo();
    CheckRole("homepageEditBtn");
    CheckRole("entryApprovalBtn");
    ReadTableFromDatabase();
});

//Listen to the account title's click event.
var accountAnchors = document.querySelectorAll(".accountAnchor");
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
function getPendingEntries() {

    //while (x = 0; x<3; x++)
    const db = ref(getDatabase(app));
    const table = document.getElementById("COAViewTable");
    const rows = table.getElementsByTagName("tr");

    get(child(db, `COA`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const cols = rows[i].getElementsByTagName("td");
            for(var j = 0; j < cols.length - 1; j++){
                cols[0].textContent = child.val().No;
                cols[1].getElementsByTagName("a")[0].textContent = child.val().Title;
                cols[2].textContent = child.val().Type;
                cols[3].textContent = child.val().ToIncrease;
            }
            i++;
        });
    });
}
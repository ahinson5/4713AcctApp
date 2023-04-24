import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, update} from "firebase/database";           
import { ShowLoggedInUserInfo } from "./MyUtil";

var acctName = "";

window.addEventListener("load", () => {
    //Updates the title based on which account the user navigated from.
    var storage = window.sessionStorage.getItem("accountAnchorName");

    acctName = storage;
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `COA`)).then((snapshot) => {

        snapshot.forEach((child) => {
            if(child.val().No == storage){
                acctName = child.val().Title;
            }
        });
        document.querySelector("#accountViewHeader").innerHTML =  acctName + " Ledger";
        ReadTableFromDatabase();
        DisplayBalance();
    });
    ShowLoggedInUserInfo();
});

//Listen to the account title's click event.
var accountAnchors = document.querySelectorAll(".ledgerPostRef");
accountAnchors.forEach(element => {
    element.addEventListener("click", () => {
        window.location = "./generaljournal-view.html";
    })
});

function DisplayBalance(){
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `MyLedger/${acctName}`)).then((snapshot) => {
        document.querySelector("#ledgerBalanceHeader").textContent = "Balance: " + snapshot.val().balance;
    });
}

//For each piece of data fetched form the DB, update the HTML table values.
function ReadTableFromDatabase(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("ledgerTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `MyLedger/${acctName}`)).then((snapshot) => {
        var i = 1;
        snapshot.forEach((child) => {
            if(child.key !== "balance"){
                const cols = rows[i].getElementsByTagName("td");
                for(var j = 0; j < cols.length - 1; j++){
                    cols[0].textContent = child.val().Date;
                    cols[1].textContent = child.val().Description;
                    cols[2].textContent = child.val().Debits;
                    cols[3].textContent = child.val().Credits;
                    cols[4].getElementsByTagName("a")[0].innerHTML = child.val().PostRef;
                }
                i++;
            }
        });
    });
}

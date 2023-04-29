import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "./firebaseinit";
import { ShowLoggedInUserInfo } from "./MyUtil";

var genTBBtn = document.querySelector("#GenTrialBalanceBtn");
var debugBtn = document.querySelector("#DebugCalcLedgerBalBtn")

window.addEventListener("load", () => {
    ShowLoggedInUserInfo();
    WriteTrialBalanceToHTML();

});
genTBBtn.addEventListener("click", () =>{
    GenerateTrialBalance();
});
debugBtn.addEventListener("click", () =>{
    CalcAndUpdateLedgerBal();
});

//Adds up the credits and debits from the ledger entries, and updates the balance.
function CalcAndUpdateLedgerBal(){
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `Ledger`)).then((snapshot) => {
        snapshot.forEach((child) => {
            var bal = 0;
            child.forEach((subchild) => {
                if(subchild.val().Credits) bal += +(-1 * subchild.val().Credits);
                if(subchild.val().Debits) bal += +subchild.val().Debits;
            });
            update(ref(getDatabase(app), `Ledger/${child.key}`), {
                balance: bal
            });
        });
    });
}

//Populates the HTML table with the current Trial Balance values from the DB
function WriteTrialBalanceToHTML(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("TrialBalanceTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `TrialBalance`)).then((snapshot) => {
        var i = 1;
        snapshot.forEach((child) => {
            const cols = rows[i].getElementsByTagName("td");
            cols[0].textContent = child.key;
            cols[1].textContent = child.val().Debit;
            cols[2].textContent = child.val().Credit;
            i++;
        });
    });
}

//Saves the HTML table values to the database
async function SaveTrialBalanceToDB(){
    const table = document.getElementById("TrialBalanceTable");
    const rows = table.getElementsByTagName("tr");
    for(var i = 1; i < rows.length; i++){
        var cols = rows[i].getElementsByTagName("td");
        if(cols[0].textContent){
            const setPromise = await set(ref(getDatabase(app), `TrialBalance/${cols[0].textContent}`), {
                Debit: cols[1].textContent,
                Credit: cols[2].textContent
            });
        }
    }
    console.log("Finished Save");
}

//Calculates the balance via the ledgers, and writes to the HTML table.
async function GenerateTrialBalance() {
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("TrialBalanceTable");
    const rows = table.getElementsByTagName("tr");

    const getPromise = await get(child(dbRef, `Ledger`)).then((snapshot) => {
        var debitTotal = 0;
        var creditTotal = 0;
        var i = 1;
        snapshot.forEach((child) => {

            const cols = rows[i].getElementsByTagName("td");
            var bal = child.val().balance;
            cols[0].textContent = child.key;

            if(child.val().balance > 0){
                cols[1].textContent = bal;
                cols[2].textContent = "";

                debitTotal += bal;
            }
            else {
                cols[1].textContent = "";
                cols[2].textContent = bal * -1;

                creditTotal += (bal * -1);
            }
            i++;
        });
        const finalCols = rows[i].getElementsByTagName("td");
        finalCols[0].textContent = "Total";
        finalCols[1].textContent = debitTotal;
        finalCols[2].textContent = creditTotal;
    });
    console.log("Finished Generating");
    SaveTrialBalanceToDB();
}

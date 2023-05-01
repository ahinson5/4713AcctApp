import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { ShowLoggedInUserInfo } from "./MyUtil";

//connecting buttons to functions
const getEntryBtn = document.getElementById("getEntryBtn");
const approveBtn = document.getElementById("approveBtn");
const denyBtn = document.getElementById("denyBtn");
//reference to table and row
const table = document.getElementById("entryDisplay");
const rows = table.getElementsByTagName("tr");
//control and operation objects
var arrayCheck = 0;
const entryArray = [];//stores entry objects retrieved from RTDB
const nameArray = [];//stores entry object name for RTDB identification
//firebase RTDB references for firebase methods to operate on
const db = getDatabase(app);
const dbRef = ref(db);

//on load
window.addEventListener('load', (event) => {
    ShowLoggedInUserInfo();
    getEntries();
});
//on click display entry funciton call
getEntryBtn.addEventListener("click", (event) => {
    displayToTable();
});
//on click approve current entry approval
approveBtn.addEventListener("click", (event) => {
    setApprove();
});
//on click deny current entry approval
denyBtn.addEventListener("click", (event) => {
    setDenied();
});

//"pops" entry off array
function displayToTable() {
    let size = entryArray.length;//size = # retrieved entries
    const loadArray = [];//manipulation table
    if (entryArray.length != 0) {
        //data fields with default blank values
        var Date = ' ';
        var Accounts = ' ';
        var PostRef = ' ';
        var Debits = ' ';
        var Credits = ' ';
        loadArray[0] = ParseCSV(entryArray[0].Date);
        loadArray[1] = ParseCSV(entryArray[0].Accounts);
        loadArray[2] = ParseCSV(entryArray[0].Description);
        loadArray[3] = ParseCSV(entryArray[0].PostRef);
        loadArray[4] = ParseCSV(entryArray[0].Debits);
        loadArray[5] = ParseCSV(entryArray[0].Credits);
        //build row from strings and append to table
        var row = table.insertRow(1);
        var cell;
        for (var x = 0; x < 6; x++) {
            cell = row.insertCell(x);
            cell.innerHTML = loadArray[x];
        }
    } else {
        console.log("no more entries to evaluate")
    }
};
async function getEntries() {
    //get full snapshot of Journal collection
    await get(child(dbRef, `Journal/`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((child) => {//iterate through each child
                const localChild = child;
                const childName = child.key;
                if (localChild.child("Approved").val() == "Pending") {//checks acount childs "Approved" object for "pending"
                    entryArray.push(child.val());//stores account childs values in array if its value is "pending"
                    nameArray.push(childName);//stores account childs name in array if its value is "pending"
                    arrayCheck = 1;
                }
            })
        }
        if (arrayCheck == 0) {
            //user feedback
            var row = table.insertRow(1);
            var cell = row.insertCell(0);
            cell.innerHTML = "No pending entries";
        }
    }).catch((error) => {
        console.error(error);
    });
};

async function setApprove() {
    //sets Journal Entry value to approved, and propogates approved entry to Ledger
    const getJournal = await get(child(ref(db), `Journal/` + nameArray[0]));
    if (getJournal.exists()) {
        update(ref(db, 'Journal/' + nameArray[0]), {
            Approved: 'Approved'
        });
        var accounts = entryArray[0].Accounts.split(",");
        var debits = entryArray[0].Debits.split(",");
        var credits = entryArray[0].Credits.split(",");
        //format data to populate
        for(var i = 0; i < 2; i++){
            const getProm = await get(child(dbRef, `Ledger/${accounts[i]}`));
            var size = getProm.size;
            const setProm = await update(ref(db, `Ledger/${accounts[i]}/Entry${size + 1}`), {
                Date: entryArray[0].Date,
                Description: entryArray[0].Description,
                Debits: debits[i],
                Credits: credits[i],
                PostRef: "1"
            });
        }
        CalcAndUpdateLedgerBal();
        nameArray.shift();
        entryArray.shift();
    } else {
        //user feedback
        var row = table.insertRow(1);
        cell = row.insertCell(1);
        cell.innerHTML = "No pending entries";
    }
    table.deleteRow(1);

};

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

async function setDenied() {
        //Set current entry approved value to denied
    await get(child(ref(db), `Journal/` + nameArray[0])).then((snapshot) => {
        console.log(child.key);
        if (snapshot.exists()) {
            update(ref(db, 'Journal/' + nameArray[0]), {
                Approved: 'Denied'
            });
            nameArray.shift();
            entryArray.shift();
        } else {
            var row = table.insertRow(1);
            cell = row.insertCell(1);
            cell.innerHTML = "No pending entries";
        }
        table.deleteRow(1);
    }).catch((error) => {
        console.error(error);
    });
};

function ParseCSV(inputString) {
    //parse string into format based on CSV
    const stringArr = inputString.split(",");
    var formattedString = "";
    for (var i = 0; i < stringArr.length; i++) {
        var newLine = "";
        if (i < stringArr.length - 1) {
            newLine += "\n\t";
        }
        formattedString += stringArr[i] + newLine;
    }
    return formattedString;
};
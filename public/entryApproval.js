import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { ShowLoggedInUserInfo } from "./MyUtil";
//import { event } from "../node_modules/firebase-functions/lib/v1/providers/analytics";


const entryTable = document.getElementById("entryDisplay");
const rows = entryTable.getElementsByTagName("tr");
const getEntryBtn = document.getElementById("getEntryBtn");
const approveBtn = document.getElementById("approveBtn");
const denyBtn = document.getElementById("denyBtn");
var arrayCheck = 0;
const entryArray = [];
const nameArray = [];
const db = getDatabase(app);
const dbRef = ref(db);
const table = document.getElementById("entryDisplay");

window.addEventListener('load', (event) => {
    console.log("window load")
    ShowLoggedInUserInfo();
    getEntries();
});

getEntryBtn.addEventListener("click", (event) => {
    console.log("getNewEntryButton");
    displayToTable();
});

approveBtn.addEventListener("click", (event) => {
    console.log("approveButton");
    setApprove();
});
denyBtn.addEventListener("click", (event) => {
    console.log("denyButton")
    setDenied();
});

function displayToTable() {
    console.log("displayToTable func entered");
    let size = entryArray.length;
    const loadArray = [];
    if (entryArray.length != 0) {//if array of children is not empty
        //date, item, post ref.,debit ,credit, account no
        //child blocks
        //parse blocks into substrings and store each individual string in new row of column
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
            console.log(loadArray[x]);
        }
    } else {
        console.log("no more entries to evaluate")
    }
};
async function getEntries() {
    //console.log("getEntries function entered");
    await get(child(dbRef, `Journal/`)).then((snapshot) => {
        //console.log("GNE");
        if (snapshot.exists()) {
            //console.log("Journal snapshot exists");
            snapshot.forEach((child) => {//gets the account child
                const localChild = child;
                const childName = child.key;
                console.log(childName);
                console.log(child.val());
                if (localChild.child("Approved").val() == "Pending") {//checks acount childs "Approved" child for "pending"
                    entryArray.push(child.val());//stores account childs values in array if its value is "pending"
                    nameArray.push(childName);//stores account childs name in array if its value is "pending"
                    arrayCheck = 1;
                }
            })
        }
        if (arrayCheck == 0) {
            var row = table.insertRow(1);
            var cell = row.insertCell(0);
            cell.innerHTML = "No pending entries";
            console.log("No pending entries");
        }
        console.log(entryArray.length);
    }).catch((error) => {
        console.error(error);
    });
};

async function setApprove() {

    const getJournal = await get(child(ref(db), `Journal/` + nameArray[0]));
    if (getJournal.exists()) {
        update(ref(db, 'Journal/' + nameArray[0]), {
            Approved: 'Approved'
        });

        var accounts = entryArray[0].Accounts.split(",");
        var debits = entryArray[0].Debits.split(",");
        var credits = entryArray[0].Credits.split(",");

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
        var row = table.insertRow(1);
        cell = row.insertCell(1);
        cell.innerHTML = "No pending entries";
        console.log("No pending entries")
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
    console.log("set denied called");
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
    console.log("in csv" + inputString);
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
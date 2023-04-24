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
const dbRef = ref(db)
const table = document.getElementById("entryDisplay");

window.addEventListener('load', (event) => {
    console.log("window load")
    ShowLoggedInUserInfo();
    getEntries();
    //displayToTable();
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
        loadArray[0] = ParseCSV(entryArray[size - 1].Date); 
        loadArray[1] = ParseCSV(entryArray[size - 1].Accounts);
        loadArray[2] = ParseCSV(entryArray[size - 1].Description);
        loadArray[3] = ParseCSV(entryArray[size - 1].PostRef);
        loadArray[4] = ParseCSV(entryArray[size - 1].Debits);
        loadArray[5] = ParseCSV(entryArray[size - 1].Credits);
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
    console.log("set denied called");
    await get(child(ref(db), `Journal/` + nameArray[nameArray.length - 1])).then((snapshot) => {
        console.log(child.key);
        if (snapshot.exists()) {
            update(ref(db, 'Journal/' + nameArray[nameArray.length - 1]), {
                Approved: 'Approved'
            });
            nameArray.pop();
            entryArray.pop();
        } else {
            var row = table.insertRow(1);
            cell = row.insertCell(1);
            cell.innerHTML = "No pending entries";
            //console.log("No pending entries");
            console.log("No pending entries")
        }
        table.deleteRow(1);
    }).catch((error) => {
        console.error(error);
    });
};

async function setDenied() {
    console.log("set denied called");
    await get(child(ref(db), `Journal/` + nameArray[nameArray.length - 1])).then((snapshot) => {
        console.log(child.key);
        if (snapshot.exists()) {
            update(ref(db, 'Journal/' + nameArray[nameArray.length - 1]), {
                Approved: 'Denied'
            });
            nameArray.pop();
            entryArray.pop();
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
    console.log("in csv"+inputString);
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

/* variable setup and html references
var form = document.querySelector("#createNewUserForm");
var label = form.querySelector("label[class='infoLabel']");
var fName = form.querySelector("input[id ='firstName']");
var lName = form.querySelector("input[id ='lastName']");
var address = form.querySelector("input[id ='address']");
var DOB = form.querySelector("input[id ='DOB']");
var pword = form.querySelector("input[class='password']");
*/

/*iterating through firebase collection children https://stackoverflow.com/questions/74252115/retrieve-first-child-value-of-parent-value-in-firebase-realtime-database
database.ref("parent").on('value', (snapshot) => {
    snapshot.forEach((child) => {
        console.log(child.key); // "child1", "child2"
        console.log(child.child("data").val()); // "123", "123"
    });
}*/
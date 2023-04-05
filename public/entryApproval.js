import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { ShowLoggedInUserInfo } from "./MyUtil";


const entryTable = document.getElementById("entryDisplay");
const rows = entryTable.getElementsByTagName("tr");
var form = document.querySelector("#buttons")
//var getEntryBtn = document.querySelector("#getNewEntryBTN");
var approveBtn = document.querySelector("#approve");
var denyBtn = document.querySelector("#deny");
var entryQ = 0;
var arrayIt = 0;
var displayIt = 0;
var cStore;
const entryArray = [];
const db = getDatabase(app);
const dbRef = ref(db)
form.addEventListener("submit", getNextEntry);
form.addEventListener("submit", displayToTable);
window.addEventListener('load', (event) => {
    ShowLoggedInUserInfo();
    getNextEntry();
    displayToTable();
});
/*
getEntryBtn.addEventListener('onclick', (event) => {
    getNextEntry();
    displayToTable();
});*/
approveBtn.addEventListener('onclick', (event) => {
    setApprove();
});
denyBtn.addEventListener('onclick', (event) => {
    setDenied();
});

function displayToTable() {
    get(child(dbRef, `Journal` + entryArray[arrayIt])).then((snapshot) => {
        var i = 1;
        cStore = snapshot;
        console.log("DTT1")
        cStore.forEach((child) => {
            const cols = rows[i].getElementsByTagName("td");
            for (var j = 0; j < cols.length - 1; j++) {
                cols[0].textContent = child.val().Date;
                cols[1].textContent = ParseCSV(child.val().Accounts);
                cols[2].getElementsByTagName("a")[0].textContent = child.val().PostRef;
                cols[3].textContent = ParseCSV(child.val().Debits);
                cols[4].textContent = ParseCSV(child.val().Credits);
            }
            i++;
        });
    });
};
function getNextEntry(){
    get(child(dbRef, `Journal/`)).then((snapshot) => {
        console.log("GNE");
        if (snapshot.exists()) {
            snapshot.forEach((child) => {
                if (child.child("Approved").val() == "Pending") {
                    entryArray[entryQ] = child.val();
                    entryQ++;
                }
            })
        }
        entryQ = 0;
    }).catch((error) => {
        console.error(error);
    });
};

function setApprove() {
    if (entryArray[arrayIt] != null) {
        set(ref(db, 'Journal' + entryArray[arrayIt]), {
            Approved: 'Approved'
        });
        arrayIt++;
    } else {
        console.log("End of array")
    }
};

function setDenied() {
    if (entryArray[arrayIt] != null) {
        set(ref(db, 'Journal' + entryArray[arrayIt]), {
            Approved: 'Denied'
        });
        arrayIt++;
    } else {
        console.log("End of array")
    }
};

function ParseCSV(inputString) {
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
}

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
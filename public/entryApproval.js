import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { ShowLoggedInUserInfo } from "./MyUtil";


const entryTable = document.getElementById("entryDisplay");
const rows = entryTable.getElementsByTagName("tr");
const getEntryBtn = document.getElementById("getEntryBtn");
const approveBtn = document.getElementById("approveBtn");
const denyBtn = document.getElementById("denyBtn");
const backBtn = document.getElementById("backBtn");
var arrayIt = 0;
var displayIt = 0;
const entryArray = [];
const db = getDatabase(app);
const dbRef = ref(db)

window.addEventListener('load', (event) => {
    console.log("window load")
    ShowLoggedInUserInfo();
    getEntries();
    //displayToTable();
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
    const table = document.getElementById("entryDisplay");
    let size = entryArray.length;
    const loadArray = [];
    if (entryArray.length != 0) {//if array of children is not empty
        //date, item, post ref.,debit ,credit, account no
        //child blocks
        //parse blocks into substrings and store each individual string in new row of column
        loadArray[0] = ParseCSV(entryArray[size - 1].Date.value); 
        loadArray[1] = ParseCSV(entryArray[size - 1].Item.value);
        loadArray[2] = ParseCSV(entryArray[size - 1].val().PostRef);
        loadArray[3] = ParseCSV(entryArray[size - 1].val().Debit);
        loadArray[4] = ParseCSV(entryArray[size - 1].val().Credit);
        for (var x = 0; x < 3; x++) {//build string components
            var Date = ' ';
            var Item = ' ';
            var PostRef = ' ';
            var Debit = ' ';
            var Credit = ' ';
            if (loadArray[x][0] !== undefined) { Date = loadArray[x][0]; };
            if (loadArray[x][1] !== undefined) { Item = loadArray[x][1]; };
            if (loadArray[x][2] !== undefined) { PostRef = loadArray[x][2]; };
            if (loadArray[x][3] !== undefined) { Debit = loadArray[x][3]; };
            if (loadArray[x][4] !== undefined) { Credit = loadArray[x][4]; };
            //build row from strings and append to table
            table += '<tr><td>' + Date + '</td><td>' + Item + '</td><td>' + PostRef + '</td><td>' + Debit + '</td><td>' + Credit + '</td></tr>';
        }
    } else {
        console.log("no more entries to evaluate")
    }
};
async function getEntries() {
    console.log("getEntries function entered");
    await get(child(dbRef, `Journal/`)).then((snapshot) => {
        console.log("GNE");
        if (snapshot.exists()) {
            console.log("Journal snapshot exists");
            snapshot.forEach((child) => {//gets the account child
                var localChild = child;
                console.log(localChild.val());
                if (localChild.child("Approved").val() == "Pending") {//checks acount childs "Approved" child for "pending"
                    entryArray.push(localChild.val());//stores account childs name in array if its value is "pending"
                    console.log(entryArray[(entryArray.length) - 1]);
                }
            })
        }
        console.log(entryArray.length);
    }).catch((error) => {
        console.error(error);
    });
};

async function setApprove() {
    if (entryArray[arrayIt] != null) {
        await set(ref(db, 'Journal' + entryArray[arrayIt]), {
            Approved: 'Approved'
        });
        arrayIt++;
    } else {
        console.log("End of array")
    }
};

async function setDenied() {
    if (entryArray[arrayIt] != null) {
        await set(ref(db, 'Journal' + entryArray[arrayIt]), {
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
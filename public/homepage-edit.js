import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, set} from "firebase/database";               

var saveDataButton = document.querySelector('#COASaveBtn');
var btns = document.getElementsByClassName("isAcctActiveBtn");

window.addEventListener('load', (event) => {
    document.getElementById('usernameProfileLabel').textContent = localStorage.getItem('username');

    ReadInfoFromDatabase();
});

saveDataButton.addEventListener("click", () => {
    WriteToDatabase();
    ReadInfoFromDatabase();
});

//Grabs all the data from the HTML table's input fields and writes them to the Realtime Database.
function WriteToDatabase() {
    const table = document.getElementById("COAEditTable");
    const rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName("input");

        const data = [];
        for (const input of inputs) {
            if (input.value) data.push(input.value);
        }

        if (data && data.length != 0) {
            set(ref(getDatabase(app), `COA/${data[0]}`), {
                No: data[0],
                Title: data[1],
                Type: data[2],
                ToIncrease: data[3],
                IsActive: true
            });
        }
    }
}

//For each piece of data fetched from the Realtime Database, update the corresponding HTML table elements.
function ReadInfoFromDatabase(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("COAEditTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `COA`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const inputs = rows[i].getElementsByTagName("input");
            inputs[0].value = child.val().No;
            inputs[1].value = child.val().Title;
            inputs[2].value = child.val().Type;
            inputs[3].value = child.val().ToIncrease;
            i++;
        });

        var j = 1;
        snapshot.forEach((child) => {
            const buttons = rows[j].getElementsByTagName("button");
            buttons[0].style.background = child.val().IsActive ? "#748B75" : "#B76D68";
            buttons[0].textContent = child.val().IsActive ? "Active" : "Inactive";
            j++;
        });

    });
}
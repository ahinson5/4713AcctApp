import { ShowLoggedInUserInfo } from "./MyUtil";
import {app} from "./firebaseinit";
import {ref, getDatabase, set, get, child} from "firebase/database"

var saveDataButton = document.querySelector('#GeneralJournalSaveBtn');

window.addEventListener("load", () => {

    ShowLoggedInUserInfo();
    ReadCoaFromDB();

});

saveDataButton.addEventListener("click", () => {
    WriteCoaToDB();
    ReadCoaFromDB();
});

//Grabs all the data from the HTML table's input fields and writes them to the Realtime Database.
function WriteCoaToDB() {
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName("input");

        const data = [];
        for (const input of inputs) {
            if (input.value) data.push(input.value);
        }

        if (data && data.length != 0) {
            set(ref(getDatabase(app), `Journal/Entry${i}`), {
                Date: data[0],
                Accounts: data[1],
                PostRef: data[2],
                Debits: data[3],
                Credits: data[4],
                Approved: false
            });
        }
    }
}

//For each piece of data fetched from the Realtime Database, update the corresponding HTML table elements.
function ReadCoaFromDB(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `Journal`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const inputs = rows[i].getElementsByTagName("input");
            inputs[0].value = child.val().Date;
            inputs[1].value = child.val().Accounts;
            inputs[2].value = child.val().PostRef;
            inputs[3].value = child.val().Debits;
            inputs[4].value = child.val().Credits;
            i++;
        });

        var j = 1;
        snapshot.forEach((child) => {
            const buttons = rows[j].getElementsByTagName("button");
            buttons[0].style.background = child.val().Approved ? "#748B75" : "#B76D68";
            buttons[0].textContent = child.val().Approved ? "Approved" : "Not Approved";
            j++;
        });

    });
}
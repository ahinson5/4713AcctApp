import { ShowLoggedInUserInfo, ParseCSV } from "./MyUtil";
import { app } from "./firebaseinit";
import { ref, getDatabase, set, get, child } from "firebase/database"

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
async function WriteCoaToDB() {
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");
    const dbRef = ref(getDatabase(app));

    for (var i = 1; i < rows.length; i++) {
        console.log = i;
        const inputs = rows[i].getElementsByTagName("input");

        const data = [];
        for (const input of inputs) {
            if (input.value) data.push(input.value);
        }

        if (data && data.length != 0) {
            var nameArr = data[1].split(",");

            const snapshot = await get(child(dbRef, `COA`));
            var postRefNo = "";

            for (var j = 0; j < nameArr.length; j++) {
                snapshot.forEach((child) => {
                    if (child.val().Title === nameArr[j]) {
                        postRefNo += child.val().No;
                        if (j < nameArr.length - 1) {
                            postRefNo += ",";
                        }
                    }
                });
            }
            set(ref(getDatabase(app), `MyJournal/Entry${i}`), {
                Date: data[0],
                Accounts: data[1],
                Debits: data[2],
                Credits: data[3],
                PostRef: postRefNo,
                Approved: "Pending"
            });
        }
    }
}

//For each piece of data fetched from the Realtime Database, update the corresponding HTML table elements.
function ReadCoaFromDB() {
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("GeneralJournalTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `MyJournal`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const inputs = rows[i].getElementsByTagName("input");
            const data = rows[i].getElementsByTagName("td");

            inputs[0].value = child.val().Date;
            inputs[1].value = child.val().Accounts;
            inputs[2].value = child.val().Debits;
            inputs[3].value = child.val().Credits;
            if (child.val().Approved === "Approved") {
                data[4].textContent = child.val().PostRef;
            }
            i++;
        });

        var j = 1;
        snapshot.forEach((child) => {
            const buttons = rows[j].getElementsByTagName("button");
            var color = "";
            var status = "";
            if (child.val().Approved === "Pending") {
                color = "#b7af68";
                status = "Pending";
            } else if (child.val().Approved === "Approved") {
                color = "#748B75";
                status = "Approved";
            } else {
                color = "#B76D68";
                status = "Not Approved";
            }
            buttons[0].style.background = color;
            buttons[0].textContent = status;
            j++;
        });

    });
}
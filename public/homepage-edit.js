import {app} from "./firebaseinit";
import {get, getDatabase, ref, child} from "firebase/database";               

var saveDataButton = document.querySelector('#COASaveBtn');

window.addEventListener('load', (event) => {
    document.getElementById('usernameProfileLabel').textContent = localStorage.getItem('username');

    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `users/FJones`)).then((snapshot) => {
        console.log(snapshot.val().userName);
    });
});

saveDataButton.addEventListener("click", ()=>{
    SaveData();
});

var btns = document.getElementsByClassName("isAcctActiveBtn");
var isActive = true;

Array.prototype.filter.call(
    btns,
    (btn) => btn.addEventListener("click", () => {
        isActive = !isActive;
        btn.style.background = isActive ? "#748B75" : "#B76D68";
        btn.textContent = isActive ? "Active" : "Inactive";
    })
);

function SaveData() {
    const table = document.getElementById("COAEditTable");
    const rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName("input");
        const data = [];
        for (const input of inputs) {
            if (input.value) data.push(input.value);
        }
        if (data && data.length != 0) {
            writeCOAData(data[0], data[1], data[2], data[3]);
        }
    }
}
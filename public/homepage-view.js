import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, set} from "firebase/database";               


window.addEventListener('load', (event) => {
    document.getElementById('usernameProfileLabel').textContent = localStorage.getItem('username');
    ReadFromDatabase();
});

var accountAnchors = document.querySelectorAll(".accountAnchor");

accountAnchors.forEach(element => {
    element.addEventListener("click", () => {
        ParseAnchor(element);
    })
});

function ParseAnchor(element){
    window.sessionStorage.setItem("accountAnchorName", element.innerHTML);
    window.location = "./account-view.html";
}

function ReadFromDatabase(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("COAViewTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `COA`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const cols = rows[i].getElementsByTagName("td");
            for(var j = 0; j < cols.length - 1; j++){
                cols[0].textContent = child.val().No;
                cols[1].getElementsByTagName("a")[0].textContent = child.val().Title;
                cols[2].textContent = child.val().Type;
                cols[3].textContent = child.val().ToIncrease;
            }
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
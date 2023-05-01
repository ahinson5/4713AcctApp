import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, set, onValue, update} from "firebase/database";               
import { ShowLoggedInUserInfo, GetUniqueID } from "./MyUtil";

var saveDataButton = document.querySelector('#COASaveBtn');

window.addEventListener('load', (event) => {
    ShowLoggedInUserInfo();
    ReadCoaFromDB();
});


saveDataButton.addEventListener("click", () => {
    WriteCoaToDB();
    ReadCoaFromDB();
});
//Grabs all the data from the HTML table's input fields and writes them to the Realtime Database.
function WriteCoaToDB() {
    const table = document.getElementById("COAEditTable");
    const rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName("input");

        const data = [];
        for (const input of inputs) {
            if (input.value) data.push(input.value);
        }

        if (data && data.length != 0) {

            const dbRef = ref(getDatabase(app));
            get(child(dbRef, `COA/Account${i}`)).then((snapshot) => {
                if(snapshot.exists()){
                    if(HasCOAChanged(snapshot, data)){
                        EventLogUpdate(snapshot, data);
                    }
                } else{
                    EventLogCreate(data);
                }
            });

            set(ref(getDatabase(app), `COA/Account${i}`), {
                No: data[0],
                Title: data[1],
                Type: data[2],
                ToIncrease: data[3],
                IsActive: true
            });
        }
    }
}
//post data event to input snapshot 
function EventLogUpdate(snapshot, data){
    var id = GetUniqueID();
    const date = new Date();
    set(ref(getDatabase(app), `COALogs/${id}`), {
        Date: date.toLocaleString(),
        User: sessionStorage.getItem("currentUser"),
        Before: `${snapshot.val().No},${snapshot.val().Title}, ${snapshot.val().Type},${snapshot.val().ToIncrease}`,
        After: `${data[0]},${data[1]},${data[2]},${data[3]}`
    });
}

//create new event
function EventLogCreate(data){
    var id = GetUniqueID();
    const date = new Date();
    set(ref(getDatabase(app), `COALogs/${id}`), {
        Date: date.toLocaleString(),
        User: sessionStorage.getItem("currentUser"),
        Before: `N/A`,
        After: `${data[0]},${data[1]},${data[2]},${data[3]}`
    });
}
//return boolean on COA change
function HasCOAChanged(snapshot, data){
    if(snapshot.val().No != data[0] || snapshot.val().Title != data[1] || snapshot.val().Type != data[2] || snapshot.val().ToIncrease != data[3]){
        return true;
    } else{
        return false;
    }
}

//For each piece of data fetched from the Realtime Database, update the corresponding HTML table elements.
function ReadCoaFromDB(){
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
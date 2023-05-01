import { ShowLoggedInUserInfo } from "./MyUtil";
import { app } from "./firebaseinit";
import { get, getDatabase, ref, child } from "firebase/database"

window.addEventListener("load", () => {
    ShowLoggedInUserInfo();
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `COALogs`)).then((snapshot) => {
        ReadCoaLogFromDB(snapshot);
    });

});

function ReadCoaLogFromDB(snapshot){
    const children = [];
    snapshot.forEach((child) => {
        children.push(child.val());
    });

    children.sort(function (a, b) { //https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.Date) - new Date(a.Date);
    });
    //reference table
    const table = document.getElementById("COALogTable");
    const rows = table.getElementsByTagName("tr");

    var j = 0;
    for (var i = 1; i < rows.length; i++){
        //load values into table
        const cols = rows[i].getElementsByTagName("td");
        if(!children[j]) continue;
        cols[0].textContent = children[j].Date;
        cols[1].textContent = children[j].User;
        cols[2].textContent = children[j].Before;
        cols[3].textContent = children[j].After;
        j++;
    }
}
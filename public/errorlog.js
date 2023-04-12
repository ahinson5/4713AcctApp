import { getDatabase, child, ref, get } from "firebase/database";
import { ShowLoggedInUserInfo } from "./MyUtil";
import { app } from "./firebaseinit";

window.addEventListener("load", () =>{
    ShowLoggedInUserInfo();

    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `ErrorLogs`)).then((snapshot) => {
        ReadErrorLogFromDB(snapshot);
    })
});

function ReadErrorLogFromDB(snapshot){
    const children = [];
    snapshot.forEach((child) => {
        children.push(child.val());
    });

    children.sort(function (a, b) { //https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.Date) - new Date(a.Date);
    });

    const table = document.getElementById("ErrorLogTable");
    const rows = table.getElementsByTagName("tr");

    var j = 0;
    for(var i = 1; i < rows.length; i++){
        const cols = rows[i].getElementsByTagName("td");
        if(!children[j]) continue;
        cols[0].textContent = children[j].Date;
        cols[1].textContent = children[j].User;
        cols[2].textContent = children[j].Message;
        j++;
    }
}
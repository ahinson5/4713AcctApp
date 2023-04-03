import {ShowLoggedInUserInfo } from "./MyUtil";
import {app} from "./firebaseinit";
import {get, getDatabase, ref, child, set} from "firebase/database";     

window.addEventListener("load", () => {
    ShowLoggedInUserInfo();
    ReadTableFromDatabase();
});

//For each piece of data fetched form the DB, update the HTML table values.
function ReadTableFromDatabase(){
    const dbRef = ref(getDatabase(app));
    const table = document.getElementById("GeneralJournalViewTable");
    const rows = table.getElementsByTagName("tr");

    get(child(dbRef, `Journal`)).then((snapshot) => {

        var i = 1;
        snapshot.forEach((child) => {
            const cols = rows[i].getElementsByTagName("td");
            for(var j = 0; j < cols.length - 1; j++){
                cols[0].textContent = child.val().Date;
                cols[1].textContent = ParseCSV(child.val().Accounts);
                cols[2].getElementsByTagName("a")[0].textContent = child.val().PostRef;
                cols[3].textContent = ParseCSV(child.val().Debits);
                cols[4].textContent = ParseCSV(child.val().Credits);
            }
            i++;
        });

        //Change the button color according to the IsActive value stored in the database.
        var j = 1;
        snapshot.forEach((child) => {
            const buttons = rows[j].getElementsByTagName("button");
            buttons[0].style.background = child.val().IsActive ? "#748B75" : "#B76D68";
            buttons[0].textContent = child.val().IsActive ? "Approved" : "Not Approved";
            j++;
        });

    });
}

function ParseCSV(inputString){
    const stringArr = inputString.split(",");
    var formattedString = "";
    for(var i = 0; i < stringArr.length; i++){
        var newLine = "";
        if(i < stringArr.length - 1){
            newLine += "\n\t";
        }
        formattedString += stringArr[i] + newLine;
    }

    return formattedString;
}
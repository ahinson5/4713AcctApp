import { app } from "./firebaseinit";
import { getDatabase, ref, set } from "firebase/database";


var form = document.querySelector("#createNewUserForm");
var label = form.querySelector("label[class='infoLabel']");
form.addEventListener("submit", SubmitForm);
function SubmitForm() {

    var fName = form.querySelector("input[id ='firstName']");
    var lName = form.querySelector("input[id ='lastName']");
    var address = form.querySelector("input[id ='address']");
    var DOB = form.querySelector("input[id ='DOB']");
    var pword = form.querySelector("input[class='password']");
    var fullname = lName.value + " " + fName.value;

    var username = fName.value[0];
    username += lName.value;
    
    const db = getDatabase(app);
    set(ref(db, 'users/' + username), {
        userName: fullname,
        userAddress: address.value,
        userDOB: DOB.value,
        userPW: pword.value,
        userRole: "accountant"
     });
    window.location.href = './index.html';
};

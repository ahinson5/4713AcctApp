import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set } from "firebase/database";


// variable setup and html references
var form = document.querySelector("#createNewUserForm");
var label = form.querySelector("label[class='infoLabel']");
var fName = form.querySelector("input[id ='firstName']");
var lName = form.querySelector("input[id ='lastName']");
var address = form.querySelector("input[id ='address']");
var DOB = form.querySelector("input[id ='DOB']");
var pword = form.querySelector("input[class='password']");


//listener and firebase db ref
const db = getDatabase(app);
form.addEventListener("submit", SubmitForm);

//set adds user information to db
function SubmitForm() {

    var fullname = lName.value + " " + fName.value;
    console.log(fullname);
    //username formatting
    var username = fName.value[0];
    username += lName.value;
    console.log(username);

    set(ref(db, 'users/' + username), {
        userName: fullname,
        userAddress: address.value,
        userDOB: DOB.value,
        userPW: pword.value,
        userRole: "accountant"
    }).then(() => window.location.href = "/index.html");;
};

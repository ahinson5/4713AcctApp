import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set } from "firebase/database";


// variable setup and html references
var form = document.querySelector("#createNewUserForm");
var label = form.querySelector("label[class='infoLabel']");
var fName = form.querySelector("input[id ='firstName']");
var lName = form.querySelector("input[id ='lastName']");
var address = form.querySelector("input[id ='address']");
var DOB = form.querySelector("input[id ='DOB']");
var password = form.querySelector("input[class='password']");
var alphaReg = /[a-z]/;
var digReg = /[0-9]/;
var scReg = /[!@#$%^&*()]/;
var pCheck1;
var pCheck2;
var fullname = lName.value + " " + fName.value;
var username = fName.value[0];
username += lName.value;

//listener and firebase db ref
const db = getDatabase(app);
form.addEventListener("submit", SubmitForm);

//set adds user information to db
<<<<<<< Updated upstream
async function SubmitForm() {
    pCheck1 = 0;
    pCheck2 = 0;
    var pword = password.value;
    console.log(pword.charAt(0));
=======
function SubmitForm() {
    var scRegx = /[!@#$%]/;
    var dgRegx = /[0-9]/;
    var anRegx = /[a-z]/;
    var passwordCheck;
    var scCheck;
    var dgCheck;
    var fullname = lName.value + " " + fName.value;
    console.log(fullname);
>>>>>>> Stashed changes
    //username formatting
    console.log(username);
<<<<<<< Updated upstream
    console.log(pword)
    if (pword.length > 7 && alphaReg.test(pword.charAt(0))) {
        //length = 8 or greater AND it contains one letter
        //check entire string for digit and sc
        for (var x = 1; x <= pword.length; x++) {
            console.log(x);
            if (digReg.test(pword.charAt(x))) {
                pCheck1 = 1;
            }
            if (scReg.test(pword.charAt(x))) {
                pCheck2 = 1;
            }
        }
        console.log(pCheck1)
        console.log(pCheck2)
        if (pCheck1 === 1 && pCheck2 === 1) {

            console.log("in function2")
            await set(ref(db, 'users/' + username), {
                userName: fullname,
                userAddress: address.value,
                userDOB: DOB.value,
                userPW: password.value,
                userRole: "accountant"
            }).then(() => window.location.href = "/index.html");
        } else {
            console.log(pCheck1.value)
            console.log(pCheck2.value);
            password.value = '';
            password.placeholder = 'Incorrect password format';
        }

    } else {
        console.log(pCheck1)
        console.log(pCheck2);
        password.value = '';
        password.placeholder = 'Incorrect password format';
=======
    if (pword.length > 7 && pword.charAt(0).toLowerCase().match(aRegx)){
        for (x = 0; x < pword.length - 1; x++) {
            if (scRegx.test(pword.charAt(x))) {
                scCheck = true;
            }
            if (dgRegx.test(pword.charAt(x))) {
                dgCheck = true;
            }
        }
        if (scCheck == true && dgCheck == true) {
            passwordCheck = true;
        }
    }
    if (passwordCheck == true) {
        set(ref(db, 'users/' + username), {
            userName: fullname,
            userAddress: address.value,
            userDOB: DOB.value,
            userPW: pword.value,
            userRole: "accountant"
        }).then(() => window.location.href = "/index.html");
    } else {
        label = "Password does not meet requirements";
>>>>>>> Stashed changes
    }
};

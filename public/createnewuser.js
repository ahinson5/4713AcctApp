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

//listener and firebase db ref
const db = getDatabase(app);
form.addEventListener("submit", SubmitForm);

window.addEventListener("load", () => {
    console.log("Loaded CreateNewUser Page");
});

function sendMail(username, email) {

    var params = {
        email: email,
        message: `Your username is: ${username}`
    };

    const serviceID = "service_96gwdm7";
    const templateID = "template_hb0yxai!!";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            console.log(res);
            alert("Check your email to get your login info.")
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            window.location.href = "./index.html"
        });
}

//set adds user information to db
async function SubmitForm() {
    console.log("Calling SubmitForm");

    var fullname = lName.value + " " + fName.value;
    var username = fName.value[0];
    username += lName.value;

    pCheck1 = 0;
    pCheck2 = 0;
    var pword = password.value;
    console.log(pword.charAt(0));
    //username formatting
    if (pword.length > 7 && alphaReg.test(pword.charAt(0))) {
        //length = 8 or greater AND it contains one letter
        //check entire string for digit and sc
        for (var x = 1; x <= pword.length; x++) {
            if (digReg.test(pword.charAt(x))) {
                pCheck1 = 1;
            }
            if (scReg.test(pword.charAt(x))) {
                pCheck2 = 1;
            }
        }
        //format validation check
        if (pCheck1 === 1 && pCheck2 === 1) {
            //set call loads fields to DB
            await set(ref(db, 'users/' + username), {
                userName: fullname,
                userAddress: address.value,
                userDOB: DOB.value,
                userPW: password.value,
                userRole: "accountant"
            }).then(() => {
                console.log("Calling SendEmail");
                sendMail(username, document.getElementById("emailInput").value);
            });
        } else {
            //user feedback if password format invalid
            password.value = '';
            password.placeholder = 'Incorrect password format';
        }

    } else {
        //user feedback if password format invalid
        password.value = '';
        password.placeholder = 'Incorrect password format';
    }
};

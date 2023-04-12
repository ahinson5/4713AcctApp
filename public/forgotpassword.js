import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set, update } from "firebase/database";

// variable setup and html references
var form = document.querySelector("#forgotPasswordForm");
var usernameBox = document.querySelector("#forgotPasswordForm input[id='username']");
var passwordBox = document.querySelector("#forgotPasswordForm input[id='newPassword']");
var infoLabel = document.querySelector("#forgotPasswordForm label[class='infoLabel']");
var pCheck1;
var pCheck2;
var alphaReg = /[a-z]/;
var digReg = /[0-9]/;
var scReg = /[!@#$%^&*()]/;
//listener and firebase db ref
form.addEventListener("submit", changePassword);
const db = getDatabase(app);

//get checks username in db, set changes username pw then redirects to index screen for login
async function changePassword() { 
    pCheck1 = 0;
    pCheck2 = 0;
    var pword = passwordBox.value;
    console.log(pword.charAt(0));
    //username formatting
    console.log(passwordBox.value);
    console.log(pword);
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
            await get(child(ref(db), `users/` + usernameBox.value)).then((snapshot) => {
                console.log("snapshot");
                if (snapshot.exists()) {
                    update(ref(db, 'users/' + usernameBox.value), {
                        userPW: pword
                    }).then(() => window.location.href = "./index.html");
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            console.log(pCheck1.value)
            console.log(pCheck2.value);
            passwordBox.value = '';
            passwordBox.placeholder = 'Incorrect password format';
        }

    } else {
        console.log(pCheck1)
        console.log(pCheck2);
        passwordBox.value = '';
        passwordBox.placeholder = 'Incorrect password format';
    }
};
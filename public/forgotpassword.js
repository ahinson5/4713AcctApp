import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set } from "firebase/database";

// variable setup and html references
var form = document.querySelector("#forgotPasswordForm");
var usernameBox = document.querySelector("#forgotPasswordForm input[id='username']");
var passwordBox = document.querySelector("#forgotPasswordForm input[id='newPassword']");
var infoLabel = document.querySelector("#forgotPasswordForm label[class='infoLabel']");

//listener and firebase db ref
form.addEventListener("submit", changePassword);
const db = getDatabase(app);

//get checks username in db, set changes username pw then redirects to index screen for login
function changePassword() { 
    get(child(db, `users/` + usernameBox.value)).then((snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().userPW != passwordBox.value) {
                 set(ref(db, 'users/' + usernameBox.value), {
                     userPW: passwordBox.value
                 }).then(() => window.location.href = "./index.html");
            }
        } else {
            console.log("This username does not exist");
        }
    }).catch((error) => {
        console.error(error);
    });
};
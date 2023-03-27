import { app } from "./firebaseinit";
import { child, get, getDatabase, ref, set, update } from "firebase/database";

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
    get(child(ref(db), `users/` + usernameBox.value)).then((snapshot) => {
        console.log("snapshot");
        if (snapshot.exists()) {
             update(ref(db, 'users/' + usernameBox.value), {
                 userPW: passwordBox.value
             }).then(() => window.location.href = "./index.html");
         }
    }).catch((error) => {
        console.error(error);
    });
};
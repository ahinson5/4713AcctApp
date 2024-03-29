import { app } from "./firebaseinit";
import { get, child, getDatabase, ref, set, update } from "firebase/database";
//import { user } from "../node_modules/firebase-functions/lib/v1/providers/auth";

//npx kill-port 9099 5001 8075 9000 5000 8085
//Grab some html elements we'll need


// variable setup and html references
var i = 0;
var form = document.querySelector("#loginHandlingForm");
var infoLabel = document.querySelector("#loginInfoLabel");
var usernameBox = form.querySelector("input[id ='username']");
var passwordBox = form.querySelector("input[id ='password']");
const db = getDatabase(app);
const dbRef = ref(getDatabase(app));
//Listener
form.addEventListener("submit", loginProc);

//login function checks failed attempts on username
//Im 
function loginProc() {
    console.log(i);
    if (i == 4) {//to many attempts catch
        loginInfoLabel.textContent = 'Too many failed attempts, refresh page.';
        get(child(dbRef, `users/` + usernameBox.value)).then((snapshot) => {
            if (snapshot.exists()) {
                update(ref(db, 'Journal/' + nameArray[nameArray.length - 1]), {
                    Password: ''
                });
                console.log("password lockout");
            }
        }).catch((error) => {
            console.error(error);
        });
        return;
    } else {
        i += 1;
        get(child(dbRef, `users/`+ usernameBox.value)).then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().userPW == passwordBox.value) {
                    window.sessionStorage.setItem("currentUser", usernameBox.value);
                    window.location.href = "./landingPage.html";
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    };
};
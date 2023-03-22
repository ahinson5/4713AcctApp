import { app } from "./firebaseinit";
import { get, child, getDatabase, ref, set } from "firebase/database";
//import { user } from "../node_modules/firebase-functions/lib/v1/providers/auth";

//npx kill-port 9099 5001 8075 9000 5000 8085
//Grab some html elements we'll need

var i = 0;
//Handle login cases
var form = document.querySelector("#loginHandlingForm");
form.addEventListener("submit", loginProc);
function loginProc() {
    const dbRef = ref(getDatabase(app));
    var validate;
    var valpw;
    console.log(i);
    if (i == 3) {//to many attempts catch
        loginInfoLabel.textContent = 'Too many failed attempts, refresh page.';
        i = 0;
        return;
    } else {
        var usernameBox = form.querySelector("input[id ='username']");
        var passwordBox = form.querySelector("input[id ='password']");

        console.log(usernameBox.value);
        console.log(passwordBox.value);
        //promise username
        let usernameFound = new Promise(function (resolve, reject) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/`+ usernameBox.value)).then((snapshot) => {
                if (snapshot.exists()) {
                    var out = snapshot.val
                } else {
                    out("False");
                }
            }).catch((error) => {
                console.error(error);
            });
            resolve(validate = out);
        });
        //promise password
        let passwordFound = new Promise(function (resolve, reject) {
            const dbRef = ref(getDatabase());
            var find = usernameBox.value + "/" + passwordBox.value;
            get(child(dbRef, `users/` + find)).then((snapshot) => {
                if (snapshot.exists()) {
                    var out = snapshot.val
                } else {
                    out("False");
                }
            }).catch((error) => {
                console.error(error);
            });
            resolve(valpw = out);
        });

        if (validate == usernameBox.value) {
            if (valpw == passwordBox.value) {
                window.location.href = './homepage-view.html';
            } else {
                //loginInfoLabel.textContent = 'password incorrect.';
                i++;
                return;
            }
        } else {
            //loginInfoLabel.textContent = 'username not found';
            return;
        };
        passwordBox.value = "";
    };
};
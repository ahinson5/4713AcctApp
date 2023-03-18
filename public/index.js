import camelCase from 'camelcase';

//npx kill-port 9099 5001 8075 9000 5000 8085
//Grab some html elements we'll need
var usernameBox = document.getElementById('username');
var passwordBox = document.getElementById('password');
var loginButton = document.getElementById("loginButton");
var loginInfoLabel = document.getElementById("loginInfoLabel");

const defaultUsername = "Bob";
const defaultPassword = "sesame";

var incorrectPasswordCount = 0;

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://swe-4713-applications-domain-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

function DoStuff(){
    console.log("Doing things");
}

function writeUserData(username, password) {

    set(ref(db, 'users/' + username), {
        username: username,
        password: password,
    });
}

function readUserData(path){
    onValue(ref(db, path), (snapshot) => {
        const data = snapshot.val();
        console.log(`Got ${data.username} from database`)
    });
}

//Set data so other scripts can use them
window.addEventListener('load', (event) => {
    if(localStorage.getItem("password") == null && localStorage.getItem("username") == null){
        localStorage.setItem('username', defaultUsername);
        localStorage.setItem('password', defaultPassword);
    }
    console.log(`Username: ${localStorage.getItem("username")}\nPassword: ${localStorage.getItem("password")}`);
});

function ResetLocalStorage(){
    localStorage.setItem('username', defaultUsername);
    localStorage.setItem('password', defaultPassword);
    console.log(`Username: ${localStorage.getItem("username")}\nPassword: ${localStorage.getItem("password")}`);
}

//Handle login cases
loginButton.addEventListener('click', (event) => {

    if (incorrectPasswordCount >= 3) {
        loginInfoLabel.textContent = 'Too many wrong attempts.';
        return;
    }

    if (usernameBox.value == localStorage.getItem("username") && passwordBox.value == localStorage.getItem("password")) {

        incorrectPasswordCount = 0;

        window.location.href = './homepage-view.html';

    } else if (usernameBox.value == '' && passwordBox.value == '') {
        loginInfoLabel.textContent = 'Enter a username and password';
    } else {
        loginInfoLabel.textContent = 'Incorrect username or password';
        incorrectPasswordCount++;
    }

});
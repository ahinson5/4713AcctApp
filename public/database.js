import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js"

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
const database = getDatabase(app);

function DoStuff(){
    console.log("Doing things");
}

function writeUserData(username, password) {

    set(ref(db, 'users/' + userId), {
        username: username,
        password: password,
    });
}

function readUserData(path){
    onValue(ref(db, path), (snapshot) => {
        const data = snapshot.val();
        console.log(`Got ${data} from database`)
    });
}




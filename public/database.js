import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set  } from "firebase/database"
//import { snapshotConstructor } from "../node_modules/firebase-functions/lib/v1/providers/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDnjCRFqJSOGRRAJYC-CfbTgwU6h4z_kzM",
  authDomain: "swe-4713-applications-domain.firebaseapp.com",
  databaseURL: "https://swe-4713-applications-domain-default-rtdb.firebaseio.com",
  projectId: "swe-4713-applications-domain",
  storageBucket: "swe-4713-applications-domain.appspot.com",
  messagingSenderId: "268014321817",
  appId: "1:268014321817:web:00aecac0523675ccc53808",
  measurementId: "G-HXS93XB23L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
const dbRef = ref(getDatabase());

//creates users, takes in provided arguments, builds user full name, formats and sends to db
export function createNewUser(username, fName, lName, address, DOB, pw) {
    var fullname = lName + " " + fName;
    set(ref(db, 'users/' + username), {
        userName: fullname,
        userAddress: address,
        userDOB: DOB,
        userPW: pw,
        userRole: "customer"
    });
}

//get data from db
export function queryLogin(uname, pword) {
    get(child(dbRef, 'users/' + uname)).then((snapshot) => {
        if (snapshot.exists()) {
            var data = snapshot.child("userPW").val();
            if (pword == data) {
                console.log(data);
                return data;
            };
        } else { return false};
    });
};




import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://swe-4713-applications-domain-default-rtdb.firebaseio.com/",
  storageBucket: 'gs://swe-4713-applications-domain.appspot.com'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

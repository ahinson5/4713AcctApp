import {app} from "./firebaseinit";
import { getDatabase, ref, child, get } from "firebase/database";
import {getDownloadURL} from "firebase/storage";

//this var bridges currrent user accross pages
var currentUser;
var currentProfilePic;

//Display current user info
export function ShowLoggedInUserInfo(){
    var uLabel = document.querySelector(".usernameProfileLabel");
    var profilePic = document.querySelector(".profilePic");

    currentUser = sessionStorage.getItem("currentUser");
    currentProfilePic = sessionStorage.getItem("profilePic");

    uLabel.textContent = currentUser;

    if(currentProfilePic === "null"){
        profilePic.setAttribute('src', 'default_user.png');
    } else{
        profilePic.setAttribute('src', currentProfilePic);
    }

}

//logs user permission for page access
export function CheckRole(classNameTohide){
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `users/${sessionStorage.getItem("currentUser")}`)).then((snapshot) => {
        if(snapshot.val().userRole == "Administrator" || snapshot.val().userRole == "Manager"){
            var edtBtn = document.querySelector(`.${classNameTohide}`);
            edtBtn.classList.remove("hidden");
        }
    });
}

//Format the csv inputs from the DB, adding an indentation and newline accordingly.
export function ParseCSV(inputString){
    const stringArr = inputString.split(",");
    var formattedString = "";
    for(var i = 0; i < stringArr.length; i++){
        var newLine = "";
        if(i < stringArr.length - 1){
            newLine += "\n\t";
        }
        formattedString += stringArr[i] + newLine;
    }

    return formattedString;
}

export function GetUniqueID(){
    return "id" + Math.random().toString(16).slice(2); //Generating unique id's. https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
}

export function DownloadProfilePic(storageRef){
    getDownloadURL(storageRef)
  .then((url) => {
    sessionStorage.setItem("profilePic", url);
  })
  .catch((error) => {
    sessionStorage.setItem("profilePic", "null");
  }).finally(() => {
    ShowLoggedInUserInfo();
  });
}
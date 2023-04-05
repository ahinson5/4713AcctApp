import {app} from "./firebaseinit"
import { getDatabase, ref, child, get } from "firebase/database";

//this var bridges currrent user accross pages
var currentUser;

export function ShowLoggedInUserInfo(){
    var uLabel = document.querySelector(".usernameProfileLabel");
    currentUser = sessionStorage.getItem("currentUser");
    uLabel.textContent = currentUser;
}

export function CheckRole(classNameTohide){
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `users/${sessionStorage.getItem("currentUser")}`)).then((snapshot) => {
        if(snapshot.val().userRole == "Administrator" || snapshot.val().userRole == "Manager"){
            var edtBtn = document.querySelector(`.${classNameTohide}`);
            edtBtn.classList.remove("hidden");
        }
    });
}
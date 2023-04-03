import {app} from "./firebaseinit"
import { getDatabase, ref, child, get } from "firebase/database";

export function ShowLoggedInUserInfo(){
    var uLabel = document.querySelector(".usernameProfileLabel");
    uLabel.textContent = sessionStorage.getItem("currentUser");
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
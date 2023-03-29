import {app} from "./firebaseinit";
import {get, getDatabase, ref, child} from "firebase/database";           
import { ShowLoggedInUserInfo } from "./MyUtil";

window.addEventListener("load", () => {
    //Updates the title based on which account the user navigated from.
    document.querySelector("#accountViewHeader").innerHTML = window.sessionStorage.getItem("accountAnchorName") + " Ledger";
    CheckRole("accountEditBtn");
    ShowLoggedInUserInfo();
})

function CheckRole(classNameTohide){
    const dbRef = ref(getDatabase(app));

    get(child(dbRef, `users/${sessionStorage.getItem("currentUser")}`)).then((snapshot) => {
        if(snapshot.val().userRole == "Administrator" || snapshot.val().userRole == "Manager"){
            var edtBtn = document.querySelector(`.${classNameTohide}`);
            edtBtn.classList.remove("hidden");
        }
    });
}


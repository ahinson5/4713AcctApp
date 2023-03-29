import { ShowLoggedInUserInfo } from "./MyUtil";
window.addEventListener("load", () => {
    //Updates the title based on which account the user navigated from.
    document.querySelector("#accountEditHeader").innerHTML = window.sessionStorage.getItem("accountAnchorName") + " Ledger";
    ShowLoggedInUserInfo();
})




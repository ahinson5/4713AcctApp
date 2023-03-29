export function ShowLoggedInUserInfo(){
    var uLabel = document.querySelector(".usernameProfileLabel");
    uLabel.textContent = sessionStorage.getItem("currentUser");
}
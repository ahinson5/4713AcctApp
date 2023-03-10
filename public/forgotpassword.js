var usernameInput = document.querySelector("#forgotPasswordForm input[id='username']");
var currentPasswordInput = document.querySelector("#forgotPasswordForm input[id='currentPassword']");
var newPasswordInput = document.querySelector("#forgotPasswordForm input[id='newPassword']");

var infoLabel = document.querySelector("#forgotPasswordForm label[class='infoLabel']");
var submitBtn = document.querySelector("#forgotPasswordForm button[id='submitNewPassword']");

var currentPassword = window.localStorage.getItem("password");
var currentUsername = window.localStorage.getItem("username");
console.log(`Username: ${currentUsername} Password: ${currentPassword}`);
submitBtn.addEventListener("click", () => {

    if (currentUsername != usernameInput.value) {
        infoLabel.textContent = "Username not found";
        return;
    }else if(currentPassword != currentPasswordInput.value){
        infoLabel.textContent = "Current password not found.";
        return;
    }
    else if (currentPassword == newPasswordInput.value) {
        infoLabel.textContent = "Password already in use.";
        return;
    } else if(newPasswordInput.value == ''){
        infoLabel.textContent = "New password field is empty.";
        return;
    }
    window.localStorage.setItem("password", newPasswordInput.value);
    infoLabel.textContent = "Congrats, you have changed your password.";
    console.log(`Password changed to: ${window.localStorage.getItem("password")}`);
});
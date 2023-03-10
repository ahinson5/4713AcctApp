/* var submitBtn = document.querySelector("#createNewUserForm button[class='submitBtn']");

submitBtn.addEventListener("click", () => {
    console.log("Clicked");
}); */

var form = document.querySelector("#createNewUserForm");
var label = form.querySelector("label[class='infoLabel']");

function SubmitForm(){
    var firstNameInput = form.querySelector("input[id='firstName']");
    var lastNameInput = form.querySelector("input[id='lastName']");

    var username = "";
    var passwordInput = form.querySelector("input[class='password']");

    username += firstNameInput.value[0];
    username += lastNameInput.value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", passwordInput.value)
    label.textContent = "New User Created!";
}
import { createNewUser } from "./database.js";
/* var submitBtn = document.querySelector("#createNewUserForm button[class='submitBtn']");

submitBtn.addEventListener("click", () => {
    console.log("Clicked");
}); */

var form = document.querySelector("#createNewUserForm");
var label = form.querySelector("label[class='infoLabel']");

function SubmitForm(){
    var firstNameInput = form.querySelector("input[id='firstName']");
    var lastNameInput = form.querySelector("input[id='lastName']");
    var addressInput = form.querySelector("input[id='address']");
    var dobInput = form.querySelector("input[id='DOB']"); 
    var passwordInput = form.querySelector("input[class='password']");
    var username = "";

    username += firstNameInput.value[0];
    username += lastNameInput.value;

    createNewUser(username, addressInput,dobInput,passwordInput)
    
    label.textContent = "New User Created!";
}
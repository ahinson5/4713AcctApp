//Grab some html elements we'll need
var usernameBox = document.getElementById('username');
var passwordBox = document.getElementById('password');
var loginButton = document.getElementById("loginButton");
var loginInfoLabel = document.getElementById("loginInfoLabel");

const defaultUsername = "Bob";
const defaultPassword = "sesame"

var incorrectPasswordCount = 0;

//Set data so other scripts can use them
window.addEventListener('load', (event) => {
    if(localStorage.getItem("password") == null && localStorage.getItem("username") == null){
        localStorage.setItem('username', defaultUsername);
        localStorage.setItem('password', defaultPassword);
    }
    console.log(`Username: ${localStorage.getItem("username")}\nPassword: ${localStorage.getItem("password")}`);
});

function ResetLocalStorage(){
    localStorage.setItem('username', defaultUsername);
    localStorage.setItem('password', defaultPassword);
    console.log(`Username: ${localStorage.getItem("username")}\nPassword: ${localStorage.getItem("password")}`);
}

//Handle login cases
loginButton.addEventListener('click', (event) => {

    if (incorrectPasswordCount >= 3) {
        loginInfoLabel.textContent = 'Too many wrong attempts.';
        return;
    }

    if (usernameBox.value == localStorage.getItem("username") && passwordBox.value == localStorage.getItem("password")) {

        incorrectPasswordCount = 0;

        window.location.href = './homepage-view.html';

    } else if (usernameBox.value == '' && passwordBox.value == '') {
        loginInfoLabel.textContent = 'Enter a username and password';
    } else {
        loginInfoLabel.textContent = 'Incorrect username or password';
        incorrectPasswordCount++;
    }

});
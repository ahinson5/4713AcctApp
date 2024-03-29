import { ShowLoggedInUserInfo } from "./MyUtil";


/* Credit to Code with Voan: https://www.youtube.com/watch?v=dgcYOm8n8ME&t=543s 
 and Email.js docs*/
var sendMailButton = document.querySelector("#sendMailButton");

sendMailButton.addEventListener("click", () => {
    sendMail();
});

window.addEventListener('load', (event) => {
    ShowLoggedInUserInfo();
});

function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_96gwdm7";
    const templateID = "template_hb0yxai!!";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message sent successfully!!")

        })
        .catch(err => console.log(err));
}

window.addEventListener('load', (event) => {
    document.getElementById('usernameProfileLabel').textContent = localStorage.getItem('username');
});

var accountAnchors = document.querySelectorAll(".accountAnchor");

accountAnchors.forEach(element => {
    element.addEventListener("click", () => {
        ParseAnchor(element);
    })
});

function ParseAnchor(element){
    window.sessionStorage.setItem("accountAnchorName", element.innerHTML);
    window.location = "./account-view.html";
}
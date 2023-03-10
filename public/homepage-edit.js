window.addEventListener('load', (event) => {
    document.getElementById('usernameProfileLabel').textContent = localStorage.getItem('username');
});

var btns = document.getElementsByClassName("isAcctActiveBtn");
var isActive = true;

Array.prototype.filter.call(
    btns,
    (btn) => btn.addEventListener("click", () => {
        isActive = !isActive;
        btn.style.background = isActive ? "#748B75" : "#B76D68";
        btn.textContent = isActive ? "Active" : "Inactive";
    })
);
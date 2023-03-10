window.addEventListener('load', (event) => {
    document.getElementById('usernameProfileLabel').textContent = localStorage.getItem('username');
});
// login button on main page
const loginButton = document.getElementById("login-btn");

if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
}

const historyButton = document.getElementById("history-btn");
if (historyButton) {
    historyButton.addEventListener('click', () => {
        window.location.href = '/history';
    });
}
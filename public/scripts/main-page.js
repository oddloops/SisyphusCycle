// login button on main page
const loginButton = document.getElementById("login-btn");

if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
}
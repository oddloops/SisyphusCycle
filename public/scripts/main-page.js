// login button on main page
const loginButton = document.getElementById("login-btn");

if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
}

const logoutButton = document.getElementById("logout-btn");
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        console.log('clicked');
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => {
            if (response.ok){
                window.location.href = '/';
            } else {
                console.log("Something went wrong");
            }
        })
        .catch(error => {
            console.error(error);
        });
    });
}

const historyButton = document.getElementById("history-btn");
if (historyButton) {
    historyButton.addEventListener('click', () => {
        window.location.href = '/history';
    });
}

const profileButton = document.getElementById("profile-btn");
if (profileButton) {
    profileButton.addEventListener('click', () => {
        window.location.href = '/profile';
    });
}
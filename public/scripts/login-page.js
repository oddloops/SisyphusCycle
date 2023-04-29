// sign up button on login page
const toSignUp = document.getElementById("to-signup");

toSignUp.addEventListener('click', () => {
    window.location.href = '/signup';
});

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then((response) => {
        console.log(response);
        if (response.ok) {
            window.location.href = '/';
        } else if (response.status === 401){
            errorMessage.textContent = 'Wrong username or password!';
        } else {
            errorMessage.textContent = 'Unexpected error';
        } 
    })
    .catch((error) => {
        errorMessage.textContent = 'Unexpected error. Please try again.'
        console.error('Error logging in', error);
    });
});


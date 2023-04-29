// login button on sign up page
const toLogin = document.getElementById("to-login");

toLogin.addEventListener('click', () => {
    window.location.href = '/login';
});

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const sexInput = document.getElementById('sex');
const weightInput = document.getElementById('weight');
const feetInput = document.getElementById('feet');
const inchesInput = document.getElementById('inches');

const errorMessage = document.getElementById('error-message');
const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    const sex = sexInput.value;
    const weight = weightInput.value;
    const feet = feetInput.value;
    const inches = inchesInput.value;

    fetch('/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, sex, weight, feet, inches })
    })
    .then((response) => {
        console.log(response);
        if (response.ok) {
            window.location.href = '/';
        } else if (response.status === 400){
            response.text().then(error => {
                errorMessage.textContent = error;
            });
            passwordInput.value = '';
        } else {
            errorMessage.textContent = 'Unexpected error';
        } 
    })
    .catch((error) => {
        errorMessage.textContent = 'Unexpected error. Please try again.'
        console.error('Error logging in', error);
    });
});
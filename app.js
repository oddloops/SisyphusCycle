const express = require('express'); // add express module
const app = express();
const db = require('./src/database/db-connection');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public')); // middleware to serve static files in public folder

// Route to main page
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// Route to login page
app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/login.html');
});

// Route to login page
app.get('/signup', (request, response) => {
    response.sendFile(__dirname + '/signup.html');
});

// Starts the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
const express = require('express'); // add express module
const app = express();
const db = require('./src/database/db-connection');
const bodyParser = require('body-parser'); // add module to parse form data
const bcrypt = require('bcrypt'); // add module for hashing passwords

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public')); // middleware to serve static files in public folder
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// retrieve web pages for the user
// Route to main page
app.get('/', (req, res) => {
    response.sendFile(__dirname + '/index.html');
});

// Route to login page
app.get('/login', (req, res) => {
    response.sendFile(__dirname + '/login.html');
});

// Route to login page
app.get('/signup', (req, res) => {
    response.sendFile(__dirname + '/signup.html');
});

/* Handle users' sent data */
// Handle login post request
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const sqlQuery = `SELECT * FROM users WHERE username = '${username}' AND pass = '${password}'`;

  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    if (result.length > 0) { // valid (found in database)
      res.send('Login successful');
    } else { // not found in database
      res.send('Invalid username or password');
    }
  });
});

// Handle signup post request
app.post('/sign-up', (req, res) => {
    const {username, password, email, sex, weight, feet, inches} = req.body;

    // Validate every field was filled
    if (!username || !password || !email || !sex || !weight || !feet || !inches) {
      return res.status(400).json({ message: "Missing fields." });
    } 
}); 

// Starts the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
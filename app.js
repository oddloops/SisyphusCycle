const express = require('express'); // add express module
const app = express();
const db = require('./src/database/db-connection');
const bodyParser = require('body-parser'); // add module to parse form data
const bcrypt = require('bcrypt'); // add module for hashing passwords
const pool = require('./src/database/db-connection');

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
  
  // query user information
  pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error sending to database");
      } else if (result.length == 0) {
        // No user is found, redirect to login page with error message
        res.send('Invalid username or password');
      } else {
        console.log('Logged In');
        res.redirect('/');
      }
    }
  );
});

// Handle signup post request
app.post('/sign-up', (req, res) => {
    const {username, password, email, sex, weight, feet, inches} = req.body;

    // Validate every field was filled
    if (!username || !password || !email || !sex || !weight || !feet || !inches) {
      return res.status(400).json({ message: "Missing fields." });
    } 

    // Add it into the sql database
    pool.query(
        'INSERT INTO users (username, password, email, sex, weight, feet, inches) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [username, password, email, sex, weight, feet, inches],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).send("Error sending to database"); 
          } else { // on successful creation, redirect to main page
            console.log('Signed Up');
            res.redirect('/');
          }
        }
    );
}); 

// Starts the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
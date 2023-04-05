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
    'SELECT * FROM users WHERE username = ?',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error sending to database");
      } else if (result.length == 0) {
        // No user is found, redirect to login page with error message
        res.send('Invalid username or password');
      } else {
        // get the hashed password from the database
        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, (err, match) => {
          if (err) {
            res.status(500).send("Error comparing passwords");
          } else if(!match) {
            res.status(400).send("Wrong password");
          } else {
            // on successful login, redirects to main page
            console.log('Logged In');
            res.redirect('/');
          }
        });
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

    // Hash the password using bcrypt hash function
    let hashPassword = password;
    const saltRounds = 12;
    // generate salt then hash 
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.error("Error hashing passwords: ", err);
          } else {
            // successfully hashed password
            console.log("Hashing successful: ", hash);
            hashPassword = hash;
            // Add information into the sql database
            pool.query(                
              'INSERT INTO users (username, password, email, sex, weight, feet, inches) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [username, hashPassword, email, sex, weight, feet, inches],
               (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(500).send("Error sending to database"); 
                } else { // on successful creation, redirect to main page
                  console.log('Signed Up');
                  console.log(hashPassword);
                  res.redirect('/');
                }
              }
            );
          }
        });
    });
}); 

// Starts the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
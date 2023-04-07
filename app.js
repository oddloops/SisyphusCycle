const express = require('express'); // add express module
const app = express();
const db = require('./src/database/db-connection');
const bcrypt = require('bcrypt'); // add module for hashing passwords
const pool = require('./src/database/db-connection');
const session = require('express-session');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public')); // middleware to serve static files in public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// initialize session middleware
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

// use ejs templating engine
app.set('view engine', 'ejs');

// retrieve web pages for the user
// Render main page
app.get('/', (req, res) => {
  const userId = req.session.userId;
  const username = req.session.username;

  res.render('index', { userId, username });
});

// Route to login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Route to login page
app.get('/signup', (req, res) => {
  res.render('signup')
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
        res.send('Invalid username or password');
      } else {
        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, (err, match) => {
          if (err) {
            res.status(500).send("Error comparing passwords");
          } else if(!match) {
            res.status(400).send("Wrong password");
          } else {
            // save user id and username to current session
            req.session.userId = result[0].id;
            req.session.username = username;

            // go back to home page
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
                  const row = pool.query('SELECT * FROM users WHERE username = ?', username);
                  // save user id and username to current session
                  req.session.userId = result.insertId;
                  req.session.username = username;
                  // redirect
                  console.log('Signed Up');
                  res.redirect('/');
                }
              }
            );
          }
        });
    });
}); 

// handle logout post request
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/')
    }
  });
});

// handle data from row
app.post('/exercise-data', (req, res) => {
  // check if logged in
  if (req.session && req.session.userId && req.session.username) {
    const { exerciseName, bodySelect, weightLbs, weightKgs, repNum, setNum, dateAchieved } = req.body;

    pool.query(                
      'INSERT INTO exercises (user_id, exercise_name, part_worked, weight_lbs, weight_kgs, reps, sets, date_achieved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.session.userId, exerciseName, bodySelect, weightLbs, weightKgs, repNum, setNum, dateAchieved],
      (error, result) => {
        if (error) {
          console.log(error);
        } else { // on successful insertion
          console.log(`Inserted data for user: ${req.session.username} id: ${req.session.userId}`);
        }
      }
    );
    res.send('Data received!');

  } else {
    res.send('Not logged in!');
  }
});

// Starts the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
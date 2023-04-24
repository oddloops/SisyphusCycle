const express = require('express'); // add express module
const app = express();
const bcrypt = require('bcrypt'); // add module for hashing passwords
const pool = require('./src/database/db-connection');
const session = require('express-session');

// const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

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

// function to get a user's exercise data
function getUserExercises(res, userId, username) {
  pool.query(
    'SELECT *, DATE_FORMAT(date_achieved, "%m/%d/%Y") AS formatted_date FROM exercises WHERE user_id = ? ORDER BY part_worked ASC',
    [userId],
    (err, result) => {
    if (err) {
      console.error(err);
      res.render('index', { userId, username, rowData: null });
    } else {
      const sortedResult = Array.isArray(result) ? (result.sort((a, b) => a.part_worked.localeCompare(b.part_worked))) : null;
      res.render('index', { userId, username, rowData: sortedResult });
    }
  });
}

// retrieve web pages for the user
// Render main page
app.get('/', (req, res) => {
  const userId = req.session.userId;
  const username = req.session.username;

  // if logged in then get data from table
  if (userId && username) {
    getUserExercises(res, userId, username);
  } else {
    res.render('index', { userId, username, rowData: null });
  }
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
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error sending to database");
      } else if (result.length == 0) {
        res.send('Invalid username or password');
      } else {
        // compare the passwords 
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
    const saltRounds = 12;
    // generate salt then hash 
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.error("Error hashing passwords: ", err);
          } else {
            // successfully hashed password
            const hashPassword = hash;
            // Add information into the sql database
            pool.query(                
              'INSERT INTO users (username, password, email, sex, weight, feet, inches) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [username, hashPassword, email, sex, weight, feet, inches],
               (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(500).send("Error sending to database"); 
                } else { // on successful creation, redirect to main page
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
  const userId = req.session.userId;
  const username = req.session.username
  if (userId && username) {
    const { exerciseName, bodySelect, weightLbs, weightKgs, repNum, setNum, dateAchieved } = req.body;

    pool.query(                
      'INSERT INTO exercises (user_id, exercise_name, part_worked, weight_lbs, weight_kgs, reps, sets, date_achieved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, exerciseName, bodySelect, weightLbs, weightKgs, repNum, setNum, dateAchieved],
      (error, result) => {
        if (error) {
          console.log(error);
        } else { // on successful insertion
          console.log(`Inserted data for user: ${userId} id: ${username}`);
        }
      }
    );
    res.send('Data received!');
  } else {
    res.send('Not logged in!');
  }
});

// handle updating data in row
app.post('/update-data', (req, res) => {
  const userId = req.session.userId;
  const username = req.session.username
  if (userId && username) {
    const { exerciseName, weightLbs, weightKgs, repNum, setNum, dateAchieved } = req.body;
    
    // add the exercise data to exercise history before updating
    pool.query(
      'INSERT INTO exercise_history (user_id, exercise_name, part_worked, weight_lbs, weight_kgs, reps, sets, date_achieved) ' +
      'SELECT user_id, exercise_name, part_worked, weight_lbs, weight_kgs, reps, sets, date_achieved ' +
      'FROM exercises ' +
      'WHERE user_id = ? AND exercise_name = ?',
      [userId, exerciseName],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error updating data');
        } else {
          // update the exercise data
          pool.query(
            'UPDATE exercises SET weight_lbs = ?, weight_kgs = ?, reps = ?, sets = ?, date_achieved = ? ' + 
            'WHERE user_id = ? AND exercise_name = ?', 
            [weightLbs, weightKgs, repNum, setNum, dateAchieved, userId, exerciseName],
            (error, result) => {
              if (error) {
                console.error(error);
              } else {
                res.send('Updated data');
              }
            }
          );
        }
      } 
    );  
  }
}); 

// handle row deletion request
app.delete('/deleteRow', (req, res) => {
  const user = req.session.userId;
  const {exercise_name} = req.body;
  console.log(exercise_name);
  // queries to delete data
  pool.query(
    'DELETE exercises, exercise_history ' +
    'FROM exercises INNER JOIN exercise_history ' + 
    'ON exercises.user_id = exercise_history.user_id AND exercises.exercise_name = exercise_history.exercise_name ' +
    'WHERE exercises.user_id = ? AND exercises.exercise_name = ?',
    [user, exercise_name],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting data');
      } else {
        console.log("Deleted from table");
        res.send('Deleted data from database');
      }
    }
  );
});

// Starts the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// For local testing
// app.listen(PORT, hostname, () => {
//     console.log(`Server running at http://${hostname}:${PORT}/`);
// });
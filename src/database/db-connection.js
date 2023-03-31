const mySql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // get environment variables

// Create connection to desired database
const connection = mySql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error(error.stack);
        return;
    }
    console.log("Connected to mySql GymPanda");
});

module.exports = connection;
const mySql = require('mysql2');
const dotenv = require('dotenv');
const url = require('url');

dotenv.config(); // get environment variables

const dbUrl = process.env.JAWDB_DB_URL;

// parse the jawsDB url
const dbConfig = url.parse(dbUrl);
const [dbUser, dbPass] = dbConfig.auth.split(':');
const dbName = dbConfig.pathname.split('/')[1];
const dbHost = dbConfig.hostname;


// Create connection to desired database
const pool = mySql.createPool({
    host: dbHost, // process.env.DB_HOSTNAME
    user: dbUser, // process.env.DB_USER
    password: dbPass, // process.env.DB_PASS
    database: dbName // process.env.DB_NAME
});

pool.getConnection((error, connection) => {
    if (error) {
        console.error(error.stack);
        return;
    }
    console.log("Connected to mySql GymPanda");
});

module.exports = pool;
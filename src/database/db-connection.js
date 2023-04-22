const mySql = require('mysql2');
const dotenv = require('dotenv');
const url = require('url');

dotenv.config(); // get environment variables

const dbUrl = process.env.JAWDB_DB_URL;

// Parse the JawsDB database URL into its component parts
const dbUrlParts = url.parse(dbUrl);

// Create connection 
const pool = mySql.createPool({
    host: dbUrlParts.hostname,
    user: dbUrlParts.auth.split(':')[0],
    password: dbUrlParts.auth.split(':')[1],
    database: dbUrlParts.path.substring(1)
});

pool.getConnection((error, connection) => {
    if (error) {
        console.error(error.stack);
        return;
    }
    console.log("Connected to database");
});

module.exports = pool;
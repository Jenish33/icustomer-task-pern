const {Pool, client} = require('pg')
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname,"/config.env")});

const {PSQL_USER, HOST, DATABASE, PASSWORD, PSQL_PORT} = process.env;

const pool = new Pool({
    user: PSQL_USER,
    host: HOST,
    database: DATABASE,
    password: String(PASSWORD),
    port: PSQL_PORT
})


module.exports = {
    pool,
};
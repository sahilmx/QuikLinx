const knex = require('knex');
const dotenv = require("dotenv");
dotenv.config();

const knexConfig = {
  client: process.env.DB_CLIENT||"pg",
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 6,
    propagateCreateError: false 
  },
};

module.exports = knex(knexConfig);

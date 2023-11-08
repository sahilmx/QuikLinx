const  {getConnection}  = require('../utils/connectionManager');
// import { getConnection } from '../utils/connectionManager';


/**
 * Get all the users.
 **/
 function getAll() {
  return getConnection().select('*').from('batch');
}


// CREATE TABLE users ( 
//   user_id integer NOT NULL ,
//   user_name varchar,
//   user_age integer,
//   CONSTRAINT users_pk PRIMARY KEY (user_id)
// );

// CREATE TABLE users (
//   id              SERIAL PRIMARY KEY,
//   name           VARCHAR(100) NOT NULL,
//   age   integer not NULL
// );


module.exports = { getAll};
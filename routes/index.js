/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const express = require('express');
// const router  = express.Router();



// ajax requests for
 // filter
 // get messages popout
 // post like


const { Pool } = require('pg');
/// Users

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getListings = function() {
//query to get all listings as a js object
return pool
    .query(`SELECT * FROM shoes`)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}



module.exports = { getListings };

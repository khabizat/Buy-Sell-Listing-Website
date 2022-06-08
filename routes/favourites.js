/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const getFavourites = function() {
  //query to get all listings as a js object
  return pool
      .query(`
      SELECT *
      FROM favourites
      JOIN shoes ON shoe_id=shoes.id
      JOIN users ON user_id = users.id
      WHERE user_id = 1;`)
      .then((result) => {
        console.log(result.rows);
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

module.exports = (db) => {
  router.get("/", (req, res) => {
    getFavourites()
    .then(data => {
      const shoes = data;
      const templateVars = {
        shoes
      }
      res.render("favourites", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  });

  return router;
};

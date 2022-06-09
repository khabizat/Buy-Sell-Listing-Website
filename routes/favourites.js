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

const getFavourites = function(user_id) {
  //query to get all listings as a js object
  return pool
      .query(`
      SELECT *
      FROM favourites
      JOIN shoes ON shoe_id=shoes.id
      JOIN users ON user_id = users.id
      WHERE user_id = $1;`, [user_id])
      .then((result) => {
        console.log(result.rows);
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const getUserName = function (user_id) {
    return pool
    .query(`SELECT name
            FROM users
            WHERE users.id = $1`, [user_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  }


module.exports = (db) => {
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    getFavourites(user_id)
    .then(data => {
      const shoes = data;
      getUserName(req.session.user_id)
      .then(user_name => {
        const templateVars = {
          user_name,
          shoes
        }
        return res.render("favourites", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  });

  return router;
};

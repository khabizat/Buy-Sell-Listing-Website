const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session")
const bcrypt = require('bcryptjs');
router.use(cookieSession({
  name: 'session',
  keys: ['key1']
}))

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});



module.exports = (db) => {
  router.get("/", (req, res) => {


    // const userId = req.session.userID;
    // const user = users[userId];
    // if (user) {
    //   res.redirect("/");
    // } else {
      res.render('login');
    // }
  });

  const compareCredentials = function (email, password) {
    return pool
    .query(`SELECT *
            FROM users
            WHERE users.email = $1
            AND users.password = $2`, [email, password])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  router.post("/", () => {
    console.log('TESTING 123')
    const  { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }
    // else if (getUserWithEmail(email)) {
    //   return res.sendStatus(400);
    // }
    //if email exists
    if (true) {

    }
    //password to string
    const enteredpwd = password.toString();

    //if password and (hashed) password from db are ===
    //set session cookie based off of of users.id
    if (varifyLogin(email, enteredpwd)) {
      compareCredentials(email, password);
      req.session.user_id = getUserID();
      res.redirect('/');
    }
    return res.redirect('/register')// alert to issue ( if time replace with drop down warning like in tweeter )
  })

  return router;
}

const varifyLogin= function(email, password) {
  return pool
  .query(`SELECT users.id
          FROM users
          WHERE users.email = $1
          AND users.password = $2`, [email, password])
  .then((result) => {
    console.log('TEST FROM varifyLogin', result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getUserID = function(email, password) {
  return pool
  .query(`SELECT users.id
          FROM users
          WHERE users.email = $1
          AND users.password = $2`, [email, password])
  .then((result) => {
    console.log('TEST FROM getUserID', result.rows)
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

/**
 *

  if (getUserByEmail(email, userList)) {
    const loginpwd = password.toString();
    const hashedPassword = userList[email].hashedPassword;
    if (bcrypt.compareSync(loginpwd, hashedPassword)) {
      req.session.user_id = userList[email].id;
      return res.redirect('/urls');
    }
  }
  res.sendStatus(403);
});
 *
 */

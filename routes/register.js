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



module.exports = (pool) => {
  router.get("/", (req, res) => {
    res.render('register');
  });


  router.post('/', (req, res) => {
    const  { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (!username || !email || !password) {
      return res.sendStatus(400);
    }
    // else if (getUserWithEmail(email)) {
    //   return res.sendStatus(400);
    // }
    addNewUser(username, email, password);
    req.session.user_id = getUserID();
    res.redirect('/');
  });

  return router;
};



const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE users.email = $1`, [email])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


const addNewUser = function(user, email, password) {
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING*;`, [user, email, password])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getUserID = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE users.id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


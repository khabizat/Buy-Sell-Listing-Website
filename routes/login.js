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


const getUserID = function(email) {
  return pool
  .query(`SELECT id, password
          FROM users
          WHERE users.email = $1`, [email])
  .then((result) => {
    console.log('TEST FROM', result.rows[0])
    return result.rows[0];
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
    console.log('TEST FROM GET USER NAME', result.rows[0])
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    getUserName(req.session.user_id)
    .then(user_name => {
      const templateVars = {
        user_name
      }
      console.log('TEST FROM server.js ', templateVars.user_name)

      return res.render("login", templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
  });

  router.post("/", (req, res) => {
    const  { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const enteredpwd = password;

    getUserID(email)
    .then(user => {
      if (!user) {
        console.log('TESTING IF STATEMENT')
        return res.status(400).send('Please enter valid email');
       }
       const dbPassword = user.password;
       const pwdmatch = bcrypt.compareSync(enteredpwd, dbPassword)
       if (!pwdmatch) {
        return res.status(400).send('Please enter valid password');
       }

       req.session.user_id = user.id;
       return res.redirect('/');
      })
    .catch((err) => {
      console.log(err.message);
    });
  })

  return router;
}


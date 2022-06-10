const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session")
const bcrypt = require('bcryptjs');
router.use(cookieSession({
  name: 'session',
  keys: ['key1']
}))




module.exports = (db) => {
  router.get("/", (req, res) => {
    getUserName(req.session.user_id, db)
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

    getUserID(email, db)
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

const getUserID = function(email, db) {
  return db
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
const getUserName = function (user_id, db) {
  return db
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

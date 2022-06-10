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
      return res.render("register", templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
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
    addNewUser(username, email, hashedPassword, db);
    req.session.user_id = getUserID(email, db);
    res.redirect('/');
  });
  return router;
};

const getUserName = function (user_id, db) {
  return db
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


// const getUserWithEmail = (email, db) => {
//   return db
//     .query(`SELECT * FROM users WHERE users.email = $1`, [email])
//     .then((result) => {
//       console.log('TESTING getUserWithEmail')
//       console.log(result.rows[0]);
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };


const addNewUser = function(user, email, password, db) {
  return db
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING*;`, [user, email, password])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getUserID = (email, db) => {
  return db
    .query(`SELECT id FROM users WHERE users.email = $1`, [email])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


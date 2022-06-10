const express = require('express');
const router  = express.Router();


const addNewMessage = function(buyer_id, shoe_id, message, db) {
  let queryString = `INSERT INTO messages (
  buyer_id,
  shoe_id,
  message) VALUES ($1, $2, $3) RETURNING *;`
  let queryParams = [
    buyer_id,
    shoe_id,
    message
  ];
  return db
    .query(queryString, queryParams)
    .then((result) => {
    return result.rows[0];
  })
};


const getMyMessages = function(user_id, db) {
  //query to get all listings as a js object
  return db
    .query(`
    SELECT shoe_id, message
    FROM messages
    JOIN users ON buyer_id = users.id
    JOIN shoes ON seller_id = users.id
    WHERE shoe_id = $1;`, [user_id])
    .then((result) => {
      console.log('test from add messages',result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}


  const getUserName = function (user_id, db) {
    return db
    .query(`SELECT users.id
            FROM users
            WHERE users.id = $1`, [user_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  }



  // module.exports = { getListings };

  module.exports = (db) => {
    router.get("/", (req, res) => {
      const user_id = req.session.user_id;
      getMyMessages(user_id, db)
      .then(data => {
        const messages = data;
        getUserName(req.session.user_id, db)
        .then(user_name => {
          const templateVars = {
            messages,
            user_name
          }
          return res.render("messages", templateVars);
        })
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })


  });

  router.post('/', (req, res) => {
    const buyer_id = req.session.user_id;
    const shoe_id = req.body.name;
    const message = req.body.message;
    getUserName(req.session.user_id, db)
    .then((buyer_id) => {
      addNewMessage({buyer_id, shoe_id, message})
      .then(sentMessage => {
        console.log('Message Sent!',sentMessage)
        res.redirect("messages")
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
    })
  });
  return router;
};

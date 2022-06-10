const { query } = require('express');
const express = require('express');
const router  = express.Router();


const addNewListing = function(shoe, db) {
  let queryString = `INSERT INTO shoes (
  seller_id,
  title,
  description,
  size,
  price,
  photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  let queryParams = [
    shoe.seller_id,
    shoe.title,
    shoe.description,
    shoe.size,
    shoe.price,
    shoe.img || null
  ];
  return db
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
};


const getSellerListings = function(user_id, db) {
  //query to get all listings as a js object
  return db
      .query(`SELECT * FROM shoes WHERE seller_id = $1`, [user_id])
      .then((result) => {
        // console.log(result.rows);
        return result.rows;
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
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  module.exports = (db) => {
    router.get("/", (req, res) => {
      const user_id = req.session.user_id;
      getSellerListings(user_id, db)
      .then(data => {
        const shoes = data;
        getUserName(req.session.user_id, db)
        .then(user_name => {
          const shoes = data;
          const templateVars = {
            shoes,
            user_name
          }
          return res.render("listings", templateVars);
        })
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })


  });

  router.post('/', (req, res) => {
      const seller_id = req.session.user_id;
      addNewListing({...req.body, seller_id }, db)
      .then(shoe => {
        res.redirect("listings");
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};


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


const addNewListing = function(shoe) {
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
  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
};

module.exports = { addNewListing };


const getSellerListings = function() {
  //query to get all listings as a js object
  return pool
      .query(`SELECT * FROM shoes WHERE seller_id = 1`)
      .then((result) => {
        // console.log(result.rows);
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



  // module.exports = { getListings };

  module.exports = (db) => {
    router.get("/", (req, res) => {
      getSellerListings()
      .then(data => {
        const shoes = data;
        getUserName(req.session.user_id)
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
      const seller_id = 1;

      addNewListing({...req.body, seller_id})
      .then(shoe => {
        res.redirect("listings")
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
  return router;
};


// demonstration of '...' functionality
// let obj1 = {name: 'Foo'}
// let obj2 = {...obj1}
// obj1 === obj2



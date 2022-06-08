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
  const queryString =
  `INSERT INTO shoes (
    seller_id,
    title,
    description,
    size,
    price,
    photo_url
    )
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;

  const values =
  [
    shoe.seller_id,
    shoe.title,
    shoe.description,
    shoe.size,
    shoe.price,
    shoe.photo_url
  ];


  return pool
  .query(queryString, values)
  .then((result) => {
    return result.rows[0];
  })
};
module.exports = { addNewListing };




module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render('listings');
  });

  router.post('/', (req, res) => {
      const seller_id = 1;
      addNewListing({...req.body, seller_id})
      .then(shoe => {
        res.redirect('/')
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



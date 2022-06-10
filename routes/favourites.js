/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


const getFavourites = function(user_id, db) {
  //query to get all listings as a js object
  return db
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
    getFavourites(user_id, db)
    .then(data => {
      const shoes = data;
      getUserName(req.session.user_id, db)
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


  router.post('/', (req, res) => {
    console.log(req.body, '<<<<From favourites POST')
    const shoe_id = 3;
    const user_id = req.session.user_id;
    addToFavourites(shoe_id, user_id, db)
    .then(result => {
      console.log('ADD TO FAVOURITES!')
      return console.log(`added to favourites`);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  })
  return router;

};

const addToFavourites = (shoe_id, user_id, db) => {
  let queryString = `INSERT INTO favourites (
    shoe_id,
    user_id) VALUES ($1, $2) RETURNING *;`
    let queryParams = [
      shoe_id,
      user_id
    ];
  return db
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// const addNewListing = function(shoe, db) {
//   let queryString = `INSERT INTO shoes (
//   seller_id,
//   title,
//   description,
//   size,
//   price,
//   photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
//   let queryParams = [
//     shoe.seller_id,
//     shoe.title,
//     shoe.description,
//     shoe.size,
//     shoe.price,
//     shoe.img || null
//   ];
//   return db
//   .query(queryString, queryParams)
//   .then((result) => {
//     return result.rows[0];
//   })
// };

const express = require('express');
const router  = express.Router();

//Change hard-coded seller_id
const deleteListing = function(seller_id, db) {
  return db
  .query(`
  DELETE FROM shoes
  WHERE seller_id = $1
  AND shoes.id = 21;
  `, [seller_id])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = (db) => {
  router.post('/', (req, res) => {
    // const shoe_id = 9;
    const user_id = req.session.user_id;
    deleteListing(user_id, db)
    .then(result => {
      res.redirect("listings");
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  })

return router;
};

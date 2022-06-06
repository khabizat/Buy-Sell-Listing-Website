const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render('listings');
  });
  router.post("/", () => {
    console.log('listings');
  });
  return router;
};

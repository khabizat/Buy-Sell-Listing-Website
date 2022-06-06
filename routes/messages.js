const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render('messages');
  });
  router.post("/", () => {
    console.log('you\'ve posted to messages.js');
  });
  return router;
};

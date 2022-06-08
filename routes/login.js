const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session");

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render('login');
  });
  router.post("/", () => {

  })
  router.post("/happy", () => {

  })
  return router;
};

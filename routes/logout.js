const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session")
const bcrypt = require('bcryptjs');
router.use(cookieSession({
  name: 'session',
  keys: ["key1"],
}))


module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    return res.redirect("/");
  });
  return router;
};




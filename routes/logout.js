const express = require('express');
const router  = express.Router();
const cookieSession = require("cookie-session")
const bcrypt = require('bcryptjs');
router.use(cookieSession({
  name: 'session',
  keys: ["key1"],
}))

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    return res.redirect("/");
  });
  return router;
};





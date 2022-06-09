// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session")
app.use(cookieSession({
  name: 'session',
  keys: ["key1"],
}))
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");



// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const indexRoutes = require("./routes/index");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const messagesRoutes = require("./routes/messages");
const favouritesRoutes = require("./routes/favourites");
const listingsRoutes = require("./routes/listings");


// Mount all resource routes

// Note: Feel free to replace the example routes below with your own
// app.use("/", indexRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/favourites", favouritesRoutes(db));
app.use("/listings", listingsRoutes(db));


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const {getListings} = require("./routes/index");
app.get("/", (req, res) => {
  getListings()
  // .then(shoes => res.send({shoes}))
  .then(data => {
    // console.log('HERE', data);
    const shoes = data;
    const templateVars = {
      shoes
    }
    res.render("index", templateVars);
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  })
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

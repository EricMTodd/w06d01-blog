console.log("server.js is running...");


// Require npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// Required databse
require("./db/db");

// Required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));


// Required controllers for router
const authorsController = require("./controllers/authors.js");
app.use("/authors/", authorsController);


// Index Route
app.get("/", (req, res) => {
	res.render("index.ejs");
});


// Listening for localhost
app.listen(3000, () => {
	console.log("server.js is listening on port 3000.");
});
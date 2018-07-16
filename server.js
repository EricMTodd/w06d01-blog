console.log("server.js is running...");


// Require npm modules
const express = require("express");
const app = express();

// Required databse
require("./db/db");


// Required controllers for router
const authorsController = require("./controllers/authors.js");
app.use("/authors", authorsController);


// Index Route
app.get("/", (req, res) => {
	res.render("index.ejs");
});


// Listening for localhost
app.listen(3000, () => {
	console.log("server.js is listening on port 3000.");
});
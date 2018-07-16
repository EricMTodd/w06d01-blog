console.log("authors.js is running...");


const express = require("express");
const router = express.Router();


// Index Route
router.get("/", (req, res) => {
	res.render("authors/index.ejs");
});


// New Route
router.get("/new", (req, res) => {
	res.render("authors/new.ejs");
});

router.post("/", (req, res) => {
	console.log(req.body);
	res.send("Server has received a request.");
});


module.exports = router;
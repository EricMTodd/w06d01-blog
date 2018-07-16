console.log("authors.js is running...");


const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("authors/index.ejs");
});


module.exports = router;
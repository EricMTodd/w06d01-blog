console.log("controllers/articles.js is running...");


const express = require("express");
const router = express.Router();
const Article = require("../models/articles");


// Index Route
router.get("/", (req, res) => {
	Article.find({}, (err, allArticles) => {
		if (err) {
			console.log(err, "Failed to display views/articles/index.ejs.");
		} else {
			res.render("articles/index.ejs", {
				"articles": allArticles
			})
		}
	});
});


module.exports = router;
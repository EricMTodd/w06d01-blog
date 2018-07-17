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


// New Route
router.get("/new", (req, res) => {
	res.render("articles/new.ejs");
});

router.post("/", (req, res) => {
	Article.create(req.body, (err, createdArticle) => {
		if (err) {
			console.log(err, "Failed to create new article.");
		} else {
			console.log("Article successfully created.");
			res.redirect("/articles");
		}
	})
});


// Show Route
router.get("/:id", (req, res) => {
	Article.findById(req.params.id, (err, shownArticle) => {
		if (err) {
			console.log(err, "Failed to show author.");
		} else {
			res.render("articles/show.ejs", {
				"article": shownArticle
			});
		}
	})
});


// Delete Route
router.delete("/:id", (req, res) => {
	Article.findByIdAndRemove(req.params.id, (err, deletedArticle) => {
		if (err) {
			console.log(err, "Failed to delete author");
		} else {
			res.redirect("/articles");
		}
	})
});


// Edit Route
router.get("/:id/edit", (req, res) => {
	Article.findById(req.params.id, (err, foundArticle) => {
		if (err) {
			console.log(err, "Failed to find article");
		} else {
			res.render("articles/edit.ejs", {
				"article": foundArticle
			})
		}
	})
});

router.put("/:id", (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedArticle) => {
		if (err) {
			console.log(err, "Failed to update model.");
		} else {
			console.log(updatedArticle, "Model successfully updated.");
			res.redirect("/articles");
		}
	})
});


module.exports = router;
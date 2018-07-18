console.log("controllers/articles.js is running...");


const express = require("express");
const router = express.Router();
const Article = require("../models/articles");
const Author = require("../models/authors");


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
	Author.find({}, (err, allAuthors) => {
			res.render("articles/new.ejs", {
				"authors": allAuthors
			});
	})
});

router.post("/", (req, res) => {
	// Create a new article, push a copy into the aurthors.
	Author.findById(req.body.authorId, (err, foundAuthor) => {
		Article.create(req.body, (err, createdArticle) => {
			foundAuthor.articles.push(createdArticle);
			foundAuthor.save((err, data) => {
				res.redirect("/articles");
			})
		})
	})
});


// Show Route
router.get("/:id", (req, res) => {
	Article.findById(req.params.id, (err, shownArticle) => {
			Author.findOne({"articles._id": req.params.id}, (err, foundAuthor) => {
					res.render("articles/show.ejs", {
					"article": shownArticle,
					"author": foundAuthor
				})
			})
	})
});


// Delete Route
router.delete("/:id", (req, res) => {
	Article.findByIdAndRemove(req.params.id, (err, deletedArticle) => {
		if (err) {
			console.log(err, "Failed to delete author");
		} else {
			Author.findOne({"articles._id":req.params.id}, (err, foundAuthor) => {
				foundAuthor.articles.id(req.params.id).remove();
				foundAuthor.save((err, data) => {
					res.redirect("/articles");
				})
			})
		}
	})
});


// Edit Route
router.get("/:id/edit", (req, res) => {
	Article.findById(req.params.id, (err, foundArticle) => {
		Author.find({}, (err, allAuthors) => {
			Author.findOne({"articles._id":req.params.id}, (err, foundArticleAuthor) => {
					res.render("articles/edit.ejs", {
						"article": foundArticle,
						"authors": allAuthors,
						"articleAuthor": foundArticleAuthor
				})
			})
		})
	})
});

router.put("/:id", (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedArticle) => {
			Author.findOne({"articles._id":req.params.id}, (err, foundAuthor) => {
				if (foundAuthor._id.toString() !== req.body.authorId) {
						foundAuthor.articles.id(req.params.id).remove();
						foundAuthor.save((err, savedFoundAuthor) => {
							Author.findById(req.body.authorId, (err, newAuthor) => {
								newAuthor.articles.push(updatdedArticle);
								newAuthor.save((err, savedNewAuthor) => {
									res.redirect("/articles/"+req.params.id);
								})
							})
						})
				} else {
				foundAuthor.articles.id(req.params.id).remove();
				foundAuthor.articles.push(updatedArticle);
				foundAuthor.save((err, data) => {
					res.redirect("/articles/"+req.params.id);
				})
			}

		})
	})
});


module.exports = router;
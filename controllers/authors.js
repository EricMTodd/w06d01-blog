console.log("authors.js is running...");


const express = require("express");
const router = express.Router();
const Author = require("../models/authors");
const Article = require("../models/articles");


// Index Route
router.get("/", (req, res) => {
	Author.find({}, (err, allAuthors) => {
			res.render("authors/index.ejs", {
				"authors": allAuthors
			});
	})
});


// New Route
router.get("/new", (req, res) => {
	res.render("authors/new.ejs");
});

router.post("/", (req, res) => {
	console.log(req.body);
	Author.create(req.body, (err, createdAuthor) => {
			console.log(createdAuthor, "This is the created author.");
			res.redirect("/authors");
	})
});


// Show Route
router.get("/:id", (req, res) => {
	Author.findById(req.params.id, (err, shownAuthor) => {
			res.render("authors/show.ejs", {
			"author": shownAuthor
			});	
	});
});


// Delete Route
router.delete("/:id", (req, res) => {
	Author.findByIdAndRemove(req.params.id, (err, deletedAuthor) => {
			const articleIds = [];
			for (let i = 0; i < deletedAuthor.articles.length; i++) {
				articleIds.push(deletedAuthor.articles[i]._id);
			}
			Article.remove({
				_id: { $in: articleIds }
			}, (err, data) => {
				res.redirect("/authors");
			})
	})
});


// Edit Route
router.get("/:id/edit", (req, res) => {
	Author.findById(req.params.id, (err, foundAuthor) => {
			res.render("authors/edit.ejs", {
			"author": foundAuthor
		})
	});
});

router.put("/:id", (req, res) => {
	Author.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAuthor) => {
			console.log(updatedAuthor, "Model successfully updated.");
			res.redirect("/authors");
	})
});


module.exports = router;
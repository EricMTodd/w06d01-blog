console.log("authors.js is running...");


const express = require("express");
const router = express.Router();
const Author = require("../models/authors");


// Index Route
router.get("/", (req, res) => {
	Author.find({} , (err, allAuthors) => {
		if (err) {
			console.log(err, "Failed to display views/authors/index.ejs")
		} else {
			res.render("authors/index.ejs", {
				"authors": allAuthors
			});
		}
	})
});


// New Route
router.get("/new", (req, res) => {
	res.render("authors/new.ejs");
});

router.post("/", (req, res) => {
	console.log(req.body);
	Author.create(req.body, (err, createdAuthor) => {
		if (err) {
			console.log(err, "Failed to create new author.")
		} else {
			console.log(createdAuthor, "This is the created author.");
			res.redirect("/authors");
		}
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
		if (err) {
			console.log(err, "Failed to delete author.");
		}	else {
			res.redirect("/authors");
		}
	})
});


module.exports = router;
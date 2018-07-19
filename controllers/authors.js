console.log("authors.js is running...");


const express = require("express");
const router = express.Router();
const Author = require("../models/authors");
const Article = require("../models/articles");


// Index Route
router.get("/", async (req, res) => {
	if (req.session.loggedin === true ) {
		try {
			const allAuthors = await Author.find({});
			res.render("authors/index.ejs", {
				"authors": allAuthors
			})
		} catch (err) {
			res.send(err)
		}
	} else {
		req.session.message = "Access denied, you are not logged in.";
		res.redirect("/auth");
	}
});


// New Route
router.get("/new", (req, res) => {
	res.render("authors/new.ejs");
});

router.post("/", async (req, res) => {
	try {
		const createdAuthor = await Author.create(req.body);
		res.redirect("/authors")
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownAuthor = await Author.findById(req.params.id);
		res.render("authors/show.ejs", {
			"author": shownAuthor
		})
	} catch (err) {
		res.send(err)
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedAuthor = await Author.findByIdAndRemove(req.params.id);
		const articleIds = [];
		for (let i = 0; i < deletedAuthor.articles.length; i++) {
			articleIds.push(deletedAuthor.articles[i]._id);
		}
			const data = await Article.remove( { _id: { $in: articleIds } } );
			res.redirect("/authors");
	} catch (err) {
		res.send(err)
	}
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	try {
		const foundAuthor = await Author.findById(req.params.id);
		res.render("authors/edit.ejs", {
			"author": foundAuthor
		})
	} catch (err) {
		res.send(err)
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect("/authors");
	} catch (err) {
		res.send(err)
	}
});


module.exports = router;
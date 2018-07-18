console.log("controllers/articles.js is running...");


const express = require("express");
const router = express.Router();
const Article = require("../models/articles");
const Author = require("../models/authors");


// Index Route
router.get("/", async (req, res) => {
	if (req.session.loggedIn === true ) {
		try {
			const allArticles = await Article.find({});
			res.render("articles/index.ejs", {
				"articles": allArticles,
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
router.get("/new", async (req, res) => {
	try {
		const allAuthors = await Author.find({});
		res.render("articles/new", {
			"authors": allAuthors
		})
	} catch (err) {
		res.send(err)
	}
});

router.post("/", async (req, res) => {
	try {
		const foundAuthor = await Author.findById(req.body.authorId);
		const createdArticle = await Author.create(req.body);
		foundAuthor.articles.push(createdArticle);
		const data = await foundAuthor.save();
		res.redirect("/articles");
	} catch (err) {
		res.send(err);
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownArticle = await Article.findById(req.params.id);
		const foundAuthor = await Author.findOne({"articles._id": req.params.id});
		res.render("articles/show.ejs", {
			"article": shownArticle,
			"author": foundAuthor
		})
	} catch (err) {
		res.send(err)
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedArticle = await Aticle.findByIdAndRemove(req.params.id);
		const foundAuthor = await Author.findOne({"articles._id":req.params.id});
		foundAuthor.articles.id(req.params.id).remove();
		const data = await foundAuthor.save();
		res.redirect("/articles");
	} catch (err) {
		res.send(err)
	}
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	try {
		const foundArticle = await Article.findById(req.params.id);
		const allAuthors = await Author.find({});
		const foundArticleAuthor = await Author.findOne({"articles._id":req.params.id});
		res.render("articles/edit.ejs", {
			"article": foundArticle,
			"authors": allAuthors,
			"articleAuthor": foundArticleAuthor
		})
	} catch (err) {
		res.send(err)
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
		const foundAuthor = await Author.findOne({"articles._id":req.params.id});
		if (foundAuthore._id.toString() !== req.body.authorId) {
			foundAuthor.articles.id(req.params.id).remove();
			const savedFoundAuthor = await foundAuthor.save();
			const newAuthor = await Author.findById(req.body.authorId);
			newAuthor.articles.push(updatedArticle);
			const savedNewAuthor = await newAuthor.save();
			res.redirect("/articles/"+req.params.id);
		} else {
			foundAuthor.articles.id(req.params.id).remove();
			foundAuthor.articles.push(updatedArticle);
			const data = await foundAuthor.save();
			res.redirect("/articles/"+req.params.id);
		}
	} catch (err) {
		res.send(err)
	}
});


module.exports = router;
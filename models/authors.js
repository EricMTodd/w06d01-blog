console.log("models/authors.js is running...");


const mongoose = require("mongoose");
const Article = require("./articles");


const authorSchema = mongoose.Schema({
	name: String,
	articles: [Article.schema]
});

module.exports = mongoose.model("Author", authorSchema);
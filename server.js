console.log("server.js is running...");


// Require npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");

// Required databse
require("./db/db");

// Required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

// Custom middleware to check session
app.use((req, res, next) => {
	// Check to see if they are logged in
	// Calling next will send them to the route they were going to with one of the controllers.

	// LOOK AT THE REQUREST OBJECT FOR INFORMATION ABOUT WHERE IT'S COMING FROM.
	next()
	// If not logged in, you can redirect them wherever you want.
});

// Set up our session
app.use(session({
	secret: "This is a random secret string that you make up.",
	resave: false, // Only save when the session object has been modified.
	saveUninitialized: false // Useful for login sessions, we only want to save when we modify the session.
}));


// Required controllers for router
// Author controller
const authorsController = require("./controllers/authors.js");
app.use("/authors", authorsController);

// Article controller
const articlesController = require("./controllers/articles.js");
app.use("/articles", articlesController);

// User controller
const userController = require("./controllers/auth");
app.use("/auth", userController);


// Home Route
app.get("/", (req, res) => {
	console.log(req.session, "This is the req.session in /articles.");
	if (req.session.loggedIn === true ) {
		res.render("index.ejs", {
		"username": req.session.username
	})
	} else {
		res.redirect("/auth");
	}
});


// Listening for localhost
app.listen(3000, () => {
	console.log("server.js is listening on port 3000.");
});
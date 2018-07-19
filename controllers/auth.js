console.log("auth.js is running...");


const express = require("express");
const router = express.Router();
const User = require("../models/users");


router.get("/", (req, res) => {
	res.render("auth/login.ejs", {
		"message": req.session.message
	});
});


router.post("/login", (req, res) => {
	// req.session is available on EVERY SINGLE REQUEST FROM THE CLIENT.
	// Our session is available in the following object.
	console.log(req.session);
	req.session.loggedIn = true;
	req.session.username = req.body.username;

	// You can add any property you want to the session.
	// As soon as you do that it is saved to the express session memory (store).
	res.redirect("/");
});


// Logging out, or destroying the session.
router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send("Error destroying session");
		} else {
			res.redirect("/auth");
		}
	})
});

module.exports = router;
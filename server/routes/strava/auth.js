require("../../config/passport");
const authRouter = require("express").Router();
const passport = require("passport");

authRouter.get("/login",
	passport.authenticate("strava", {scope: "profile:read_all,activity:read_all"}), () => {
	// The request will be redirected to Strava for authentication, so this
	// function will not be called.
	}
);

authRouter.get("/callback", (req, res, next) => {
	passport.authenticate("strava", (err, user) => {
		if(err) return res.redirect("http://localhost:3000");
		if(!user) return res.redirect("http://localhost:3000");
		req.login(user, (error) => {
			if(error) return res.redirect("http://localhost:3000");
			return res.redirect("http://localhost:3000/dashboard");
		});
	})(req, res, next);
});

authRouter.get("/isAuthenticated", (req, res) => {
	return req.isAuthenticated()
		? res.status(200).json({isAuthenticated: true})
		: res.status(401).json({isAuthenticated: false});
});

module.exports = authRouter;
require("../../config/passport");
const authRouter = require("express").Router();
const passport = require("passport");

const CLIENT_REDIRECT_URL = process.env.NODE_ENV === "production"
	? process.env.CLIENT_DASHBOARD_URL_PROD
	: process.env.CLIENT_DASHBOARD_URL_DEV;

authRouter.get("/login",
	passport.authenticate("strava", {scope: "profile:read_all,activity:read_all"}), () => {
	// The request will be redirected to Strava for authentication, so this
	// function will not be called.
	}
);

authRouter.get("/callback", (req, res, next) => {
	passport.authenticate("strava", (err, user) => {
		if(err) return res.redirect(CLIENT_REDIRECT_URL);
		if(!user) return res.redirect(CLIENT_REDIRECT_URL);
		user.scope = req.query && req.query.scope;
		req.login(user, (error) => {
			if(error) return res.redirect(CLIENT_REDIRECT_URL);
			return res.redirect(CLIENT_REDIRECT_URL);
		});
	})(req, res, next);
});

authRouter.get("/isAuthenticated", (req, res) => {
	return req.isAuthenticated()
		? res.status(200).json({isAuthenticated: true})
		: res.status(401).json({isAuthenticated: false});
});

authRouter.get("/logout", (req, res) => {
	req.logout();
	req.session = null;
	return res.status(200).json({message: "Successfully logged out", isAuthenticated: false});
});

module.exports = authRouter;
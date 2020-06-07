require("dotenv").config();
const passport = require("passport");
const StravaStrategy = require("passport-strava-oauth2").Strategy;

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(new StravaStrategy({
	clientID: process.env.STRAVA_CLIENT_ID,
	clientSecret: process.env.STRAVA_CLIENT_SECRET,
	callbackURL: "/strava/auth/callback"
}, (accessToken, refreshToken, profile, done)  => {
	return done(null, {profile, accessToken, refreshToken});
}));
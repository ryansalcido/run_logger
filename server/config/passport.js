require("dotenv").config();
const passport = require("passport");
const StravaStrategy = require("passport-strava-oauth2").Strategy;

passport.serializeUser((user, done) => {
	console.log("SERIALIZE");
  done(null, user);
});

passport.deserializeUser((user, done) => {
	console.log("DESERIALIZE");
  done(null, user);
});

passport.use(new StravaStrategy({
	clientID: process.env.STRAVA_CLIENT_ID,
	clientSecret: process.env.STRAVA_CLIENT_SECRET,
	callbackURL: "/strava/auth/callback"
}, (accessToken, refreshToken, profile, done)  => {
	console.log("PASSPORT", accessToken, refreshToken, profile);
	return done(null, {profile, accessToken, refreshToken});
}));
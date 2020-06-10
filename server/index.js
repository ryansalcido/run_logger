require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const stravaRouter = require("./routes/strava");
const path = require("path");
const port = 8443;

app.use(cookieSession({
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.disable("x-powered-by");

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/run-logger", stravaRouter);

const publicPath = path.join(__dirname, "build");
app.use("/run-logger", express.static(publicPath));
app.use("/run-logger/*", express.static(publicPath));

app.listen(port, () => console.log(`Server running on port ${port}`));
require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const stravaRouter = require("./routes/strava");
const port = 8443;

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.disable("x-powered-by");

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/strava", stravaRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
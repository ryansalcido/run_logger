require("dotenv").config();
const express = require("express");
const stravaRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const axios = require("axios");

const stravaBaseUrl = "https://www.strava.com/api/v3";
const defaultErrorMsg = {message: "Error retrieving data from Strava", errors: [{code: "invalid", field: "unknown", resource: "resource"}]};

function stravaAxios(user, url) {
	return new Promise((resolve, reject) => {
		axios({url: `${stravaBaseUrl}${url}`, headers: {Authorization: `Bearer ${user.accessToken}`}}).then(response => {
			resolve(response.data);
		}).catch(error => {
			const { data } = error && error.response;
			data ? reject(data) : reject(defaultErrorMsg);
		});
	});
}

function isUserAuthenticated(req, res, next) {
	console.log("REQ: ", req.user);
	return req.isAuthenticated() ? next() : res.status(401).json({error: "Unauthorized"});
}

stravaRouter.get("/auth/login", 
	passport.authenticate("strava", {scope: "profile:read_all,activity:read_all"}), (req, res) => {
	console.log("HELLO");
	// The request will be redirected to Strava for authentication, so this
    // function will not be called.
});

stravaRouter.get("/auth/callback", passport.authenticate("strava"), (req, res) => {
	// console.log("STRAVA CALLBACK: ", req.user);
	console.log("HELLO", req.query, req.user.accessToken, req.user.refreshToken);
	// res.redirect("/strava/profile");
	res.redirect("http://localhost:3000/");
});

stravaRouter.get("/profile", isUserAuthenticated, (req, res) => {
	console.log("PROFILE ENDPOINT", req.user);
	stravaAxios(req.user, "/athlete").then(response => {
		res.status(200).json({profile: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

stravaRouter.get("/activites", isUserAuthenticated, (req, res) => {
	stravaAxios(req.user, "/activities/asdsd").then(response => {
		res.status(200).json({activities: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

module.exports = stravaRouter;
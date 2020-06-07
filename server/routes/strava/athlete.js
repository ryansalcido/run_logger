const athleteRouter = require("express").Router();
const { stravaAxios } = require("../../utils/stravaAxios");
const { isUserAuthenticated } = require("../../middlewares/auth");

athleteRouter.get("/", isUserAuthenticated, (req, res) => {
	stravaAxios(req.user, "/athlete").then(response => {
		res.status(200).json({profile: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

athleteRouter.get("/activities", isUserAuthenticated, (req, res) => {
	stravaAxios(req.user, "/activities").then(response => {
		res.status(200).json({activities: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

module.exports = athleteRouter;
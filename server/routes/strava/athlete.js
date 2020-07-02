const athleteRouter = require("express").Router();
const { stravaAxios } = require("../../utils/stravaAxios");
const { isUserAuthenticated } = require("../../middlewares/auth");

athleteRouter.get("/", isUserAuthenticated, (req, res) => {
	stravaAxios(req.user, "/athlete").then(response => {
		res.status(200).json({profile: response, scope: req.user.scope});
	}).catch(error => {
		res.status(400).json(error);
	});
});

athleteRouter.get("/activities", isUserAuthenticated, (req, res) => {
	const { page } = req.query;
	stravaAxios(req.user, `/activities?page=${page}&per_page=50`).then(response => {
		res.status(200).json({result: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

athleteRouter.get("/:id/stats", isUserAuthenticated, (req, res) => {
	const { id } = req.params;
	stravaAxios(req.user, `/athletes/${id}/stats`).then(response => {
		res.status(200).json({result: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

module.exports = athleteRouter;
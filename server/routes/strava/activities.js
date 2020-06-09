const activitiesRouter = require("express").Router();
const { stravaAxios } = require("../../utils/stravaAxios");
const { isUserAuthenticated } = require("../../middlewares/auth");

activitiesRouter.get("/:id", isUserAuthenticated, (req, res) => {
	const { id } = req.params;
	stravaAxios(req.user, `/activities/${id}`).then(response => {
		res.status(200).json({activity: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

activitiesRouter.get("/:id/kudos", isUserAuthenticated, (req, res) => {
	const { id } = req.params;
	stravaAxios(req.user, `/activities/${id}/kudos`).then(response => {
		res.status(200).json({result: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

activitiesRouter.get("/:id/comments", isUserAuthenticated, (req, res) => {
	const { id } = req.params;
	stravaAxios(req.user, `/activities/${id}/comments`).then(response => {
		res.status(200).json({result: response});
	}).catch(error => {
		res.status(400).json(error);
	});
});

module.exports = activitiesRouter;
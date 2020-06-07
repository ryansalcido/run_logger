function isUserAuthenticated(req, res, next) {
	return req.isAuthenticated() ? next() : res.status(401).json({error: "Unauthorized"});
}

module.exports = {
	isUserAuthenticated
};
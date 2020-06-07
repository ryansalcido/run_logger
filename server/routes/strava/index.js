const stravaRouter = require("express").Router();
const authRouter = require("./auth");
const athleteRouter = require("./athlete");
const activitiesRouter = require("./activities");

stravaRouter.use("/auth", authRouter);

stravaRouter.use("/athlete", athleteRouter);

stravaRouter.use("/activities", activitiesRouter);

module.exports = stravaRouter;
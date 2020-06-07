import React from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const formatUTC = (utc, format) => {
	return moment.utc(utc).format(format);
};

export const convertMetersToMiles = (meters) => {
	return (meters / 1609).toFixed(2);
};

export const calculateMovingTime = (seconds) => {
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds / 60) % 60);
	const sec = Math.floor(seconds % 60);
	return `${days > 0 ? days + ":" : ""}${hours > 0 ? hours + ":" : ""}${minutes < 10 ? "0" + minutes : minutes}:${sec < 10 ? "0" + sec : sec}`;
};

export const calculateAveragePace = (seconds, meters) => {
	const miles = convertMetersToMiles(meters);
	const secPerMile = seconds / miles;
	let minutes = Math.floor(Math.floor(secPerMile) / 60);
	let sec = Math.round(secPerMile % 60);
	if(sec === 60) {
		sec = 0;
		minutes++;
	}
	return `${minutes}:${sec < 10 ? "0" + sec : sec}`;
};

export const createRunStatColumn = (columnName, value, conversionFunction) => {
	return (
		<Grid item xs={3}>
			<Grid item>
				<Typography align="center">{columnName}</Typography>
			</Grid>
			<Grid item>
				<Typography align="center">{conversionFunction(value)}</Typography>
			</Grid>
		</Grid>
	);
};

export const getUserInitials = (firstName, lastName) => {
	return `${firstName !== "" ? firstName.charAt(0) : ""}${lastName !== "" ? lastName.charAt(0) : ""}`.toUpperCase();
};

export const createHexColorByString = (string) => {
	var hash = 0;
	if(string.length === 0) return "#000000";
	for(var i = 0; i < string.length; i++) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
		hash = hash & hash;
	}
	var color = "#";
	for(var idx = 0; idx < 3; idx++) {
		var value = (hash >> (idx * 8)) & 255;
		color += ("00" + value.toString(16)).substr(-2);
	}
	return color;
};
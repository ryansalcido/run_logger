import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useForm from "../../hooks/useForm";
import TimeView from "./TimeView";
import DistanceView from "./DistanceView";
import PaceView from "./PaceView";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const KILOMETERS_IN_MILE = 1.609344;

const useStyles = makeStyles(theme => ({
	PaceCalculatorRoot: {
		padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`
	},
	directionItem: {
		padding: 0,
		textAlign: "center" //Fix IE11 center align issue
	},
	directionList: {
		//Fix IE11 issue with not wrapping text
		width: "100%"
	}
}));

const convertTimeToSeconds = (time) => {
	return (time.hours ? Number(time.hours) * 3600 : 0) 
		+ (time.minutes ? Number(time.minutes) * 60 : 0)
		+ (time.seconds ? Number(time.seconds) : 0);
};

const isFormValid = (form) => {
	for(const key in form) {
		if(key !== "units" && form[key] !== undefined && form[key] !== "") {
			return true;
		}
	}
	return false;
};

const formatSecondsToStandardTime = (seconds) => {
	return {
		hours: Math.floor(seconds / SECONDS_IN_HOUR),
		minutes: Math.floor(seconds % SECONDS_IN_HOUR / SECONDS_IN_MINUTE),
		seconds: Math.floor(seconds % SECONDS_IN_MINUTE)
	};
};

const kilometersToMiles = (kilometers) => {
	return Number(kilometers) / KILOMETERS_IN_MILE;
};

const milesToKilometers = (miles) => {
	return Number(miles) * KILOMETERS_IN_MILE;
};

const convertDistance = (distance, from, to) => {
	if(from === "mi" && to === "km") return milesToKilometers(distance);
	if(from === "km" && to === "mi") return kilometersToMiles(distance);
};

const PaceCalculator = () => {
	const classes = useStyles();

	const [ time, setTime, handleTimeChange ] = useForm({hours: "", minutes: "", seconds: ""});
	const [ distance, setDistance, handleDistanceChange ] = useForm({value: "", units: "mi"});
	const [ pace, setPace, handlePaceChange ] = useForm({hours: "", minutes: "", seconds: "", units: "mi"});

	const calculatePace = () => {
		if(isFormValid(time) && isFormValid(distance)) {
			let length = Number(distance.value);
			if(distance.units !== pace.units) {
				length = convertDistance(length, distance.units, pace.units);
			}
			const seconds = convertTimeToSeconds(time) / length;
			setPace(prev => ({...prev, ...formatSecondsToStandardTime(seconds)}));
		}
	};

	const calculateDistance = () => {
		if(isFormValid(time) && isFormValid(pace)) {
			let length = convertTimeToSeconds(time) / convertTimeToSeconds(pace);
			if(pace.units !== distance.units) {
				length = convertDistance(length, pace.units, distance.units);
			}
			setDistance(prev => ({...prev, value: parseFloat(length.toFixed(5))}));
		}
	};

	const calculateTime = () => {
		if(isFormValid(distance) && isFormValid(pace)) {
			let length = Number(distance.value);
			if(distance.units !== pace.units) {
				length = convertDistance(length, distance.units, pace.units);
			}
			const seconds = convertTimeToSeconds(pace) * length;
			setTime(formatSecondsToStandardTime(seconds));
		}
	};

	return (
		<div className={classes.PaceCalculatorRoot}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography variant="h4" align="center">Pace Calculator</Typography>
					<Grid container item xs={12} justify="center">
						<List disablePadding className={classes.directionList}>
							<ListItem className={classes.directionItem}>
								<ListItemText primary="1) Enter 2 of the 3 fields (Distance, Time, Pace)"
									primaryTypographyProps={{variant: "body2"}} />
							</ListItem>
							<ListItem className={classes.directionItem}>
								<ListItemText primary="2) Click the calculate button on the field you want" 
									primaryTypographyProps={{variant: "body2"}} />
							</ListItem>
						</List>
					</Grid>
				</Grid>
				<TimeView time={time} handleTimeChange={handleTimeChange} calculateTime={calculateTime} />
				<DistanceView distance={distance} handleDistanceChange={handleDistanceChange} calculateDistance={calculateDistance} />
				<PaceView pace={pace} handlePaceChange={handlePaceChange} calculatePace={calculatePace} />
			</Grid>
		</div>
	);
};

export default PaceCalculator;
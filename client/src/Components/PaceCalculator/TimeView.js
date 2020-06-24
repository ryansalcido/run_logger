import React from "react";
import PaceTextField from "./PaceTextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CalculateButton from "./CalculateButton";
import PropTypes from "prop-types";

const TimeView = ({ time, handleTimeChange, calculateTime }) => {
	return (
		<Grid container item>
			<Grid item xs={12}>
				<Typography variant="h6" align="center">Time</Typography>
			</Grid>
			<Grid container item xs={12} justify="center" spacing={1}>
				<Grid item xs={3} sm={3} md={2} lg={1}>
					<PaceTextField value={time.hours} name="hours" helperText="hour"
						type="number" onChange={handleTimeChange} />
				</Grid>
				<Grid item xs={3} sm={3} md={2} lg={1}>
					<PaceTextField value={time.minutes} name="minutes" helperText="min"
						type="number" onChange={handleTimeChange} />
				</Grid>
				<Grid item xs={3} sm={3} md={2} lg={1}>
					<PaceTextField value={time.seconds} name="seconds" helperText="sec" 
						type="number" onChange={handleTimeChange} />
				</Grid>
				<Grid item>
					<CalculateButton onClick={calculateTime} />
				</Grid>
			</Grid>
		</Grid>
	);
};

TimeView.propTypes = {
	time: PropTypes.object.isRequired,
	handleTimeChange: PropTypes.func.isRequired,
	calculateTime: PropTypes.func.isRequired
};

export default TimeView;
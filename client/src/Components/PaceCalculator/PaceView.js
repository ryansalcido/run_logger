import React from "react";
import PaceTextField from "./PaceTextField";
import CalculateButton from "./CalculateButton";
import DistanceUnitSelect from "./DistanceUnitSelect";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const PaceView = ({ pace, handlePaceChange, calculatePace }) => {

	return (
		<Grid container item spacing={1}>
			<Grid container item xs={12} justify="center" alignItems="center" spacing={1}>
				<Grid item>
					<Typography variant="h6" align="center">Pace Per</Typography>
				</Grid>
				<Grid item>
					<DistanceUnitSelect name="units"
						value={pace.units} onChange={handlePaceChange}/>
				</Grid>
			</Grid>
			<Grid container item xs={12} justify="center" spacing={1}>
				<Grid item xs={3} sm={3} md={2} lg={1}>
					<PaceTextField value={pace.hours} name="hours" helperText="hour"
						type="number" onChange={handlePaceChange} />
				</Grid>
				<Grid item xs={3} sm={3} md={2} lg={1}>
					<PaceTextField value={pace.minutes} name="minutes" helperText="min"
						type="number" onChange={handlePaceChange} />
				</Grid>
				<Grid item xs={3} sm={3} md={2} lg={1}>
					<PaceTextField value={pace.seconds} name="seconds" helperText="sec" 
						type="number" onChange={handlePaceChange} />
				</Grid>
				<Grid item>
					<CalculateButton onClick={calculatePace} />
				</Grid>
			</Grid>
		</Grid>
	);
};

PaceView.propTypes = {
	pace: PropTypes.object.isRequired,
	handlePaceChange: PropTypes.func.isRequired,
	calculatePace: PropTypes.func.isRequired
};

export default PaceView;
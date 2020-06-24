import React from "react";
import PaceTextField from "./PaceTextField";
import CalculateButton from "./CalculateButton";
import DistanceUnitSelect from "./DistanceUnitSelect";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const DistanceView = ({ distance, handleDistanceChange, calculateDistance }) => {

	return (
		<Grid container item>
			<Grid item xs={12}>
				<Typography variant="h6" align="center">Distance</Typography>
			</Grid>
			<Grid container item xs={12} justify="center" spacing={1}>
				<Grid item xs={4} sm={3} md={2} lg={1}>
					<PaceTextField value={distance.value} name="value" helperText="distance" 
						type="number" onChange={handleDistanceChange} />
				</Grid>
				<Grid item>
					<DistanceUnitSelect name="units" value={distance.units} onChange={handleDistanceChange} />
				</Grid>
				<Grid item>
					<CalculateButton onClick={calculateDistance} />
				</Grid>
			</Grid>
		</Grid>
	);
};

DistanceView.propTypes = {
	distance: PropTypes.object.isRequired,
	handleDistanceChange: PropTypes.func.isRequired,
	calculateDistance: PropTypes.func.isRequired
};

export default DistanceView;
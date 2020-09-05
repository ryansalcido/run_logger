import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SplitAnalysisTable from "./SplitAnalysisTable";
import LeafletMap from "../../Activity/LeafletMap";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	activityLeafletMap: {
		height: 340
	}
}));

const SplitMapView = ({ activity }) => {
	const classes = useStyles();

	return (
		<Grid container spacing={1} justify="center">
			<Grid item xs={12} sm={10} md={4} lg={3}>
				<SplitAnalysisTable splits={activity.splits_standard} />
			</Grid>
			<Grid item xs={12} sm={10} md={6} lg={7} className={classes.activityLeafletMap}>
				<LeafletMap polyline={activity.map.polyline}
					startLatLng={activity.start_latlng} endLatLng={activity.end_latlng} />
			</Grid>
		</Grid>
	);
};

SplitMapView.propTypes = {
	activity: PropTypes.object.isRequired
};

export default SplitMapView;
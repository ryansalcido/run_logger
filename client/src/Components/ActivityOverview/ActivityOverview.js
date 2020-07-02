import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useAxios from "../../hooks/useAxios";
import SplitAnalysisTable from "./SplitAnalysis/SplitAnalysisTable";
import LeafletMap from "../Activity/LeafletMap";

const useStyles = makeStyles(theme => ({
	activityOverviewRoot: {
		padding: theme.spacing(3)
	},
	activityLeafletMap: {
		height: 340
	}
}));

const ActivityOverview = () => {
	const classes = useStyles();

	const { activityId } = useParams();
	const { data: activity } = useAxios(`activities/${activityId}`);
	console.log("DATA: ", activity);

	return (
		<div className={classes.activityOverviewRoot}>
			{activity && (
				<Grid container spacing={1} justify="center">
					<Grid item xs={12} sm={10} md={4} lg={3}>
						<SplitAnalysisTable splits={activity.splits_standard} />
					</Grid>
					<Grid item xs={12} sm={10} md={6} lg={7} className={classes.activityLeafletMap}>
						<LeafletMap polyline={activity.map.polyline}
							startLatLng={activity.start_latlng} endLatLng={activity.end_latlng} />
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default ActivityOverview;
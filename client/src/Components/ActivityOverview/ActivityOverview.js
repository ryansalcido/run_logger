import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StravaContext } from "../../Context/StravaContext";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import SplitMapView from "./SplitMap/SplitMapView";
import SummaryView from "./Summary/SummaryView";

const useStyles = makeStyles(theme => ({
	activityOverviewRoot: {
		padding: theme.spacing(3)
	}
}));

const ActivityOverview = () => {
	const classes = useStyles();

	const { activityId } = useParams();
	const { profile } = useContext(StravaContext);
	const { data: activity } = useAxios(`activities/${activityId}`);
	console.log("DATA: ", activity);

	return (
		<div className={classes.activityOverviewRoot}>
			{activity && (
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<SummaryView activity={activity} avatar={profile.profile_medium} />
					</Grid>
					<Grid item xs={12}>
						<SplitMapView activity={activity} />
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default ActivityOverview;
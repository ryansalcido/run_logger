import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	listStats: {
		padding: `${theme.spacing(1)}px 0`,
		"& div:not(:last-child)": {
			borderRight: "1px solid lightgray"
		}
	},
	bold: {
		fontWeight: "bold"
	}
}));

const calculateTotalActivities = (stats) => {
	return stats.all_ride_totals.count + stats.all_run_totals.count + stats.all_swim_totals.count;
};

const CardBody = ({ profile, stats }) => {
	const classes = useStyles();

	return (
		<Grid container item justify="center" className={classes.listStats}>
			<Grid container item xs={4} alignItems="center" direction="column">
				<Typography variant="body2">Following</Typography>
				<Typography className={classes.bold} variant="body2">
					{profile.friend_count ? profile.friend_count : "N/A"}
				</Typography>
			</Grid>
			<Grid container item xs={4} alignItems="center" direction="column">
				<Typography variant="body2">Followers</Typography>
				<Typography className={classes.bold} variant="body2">
					{profile.follower_count ? profile.follower_count : "N/A"}
				</Typography>
			</Grid>
			<Grid container item xs={4} alignItems="center" direction="column">
				<Typography variant="body2">Activities</Typography>
				<Typography className={classes.bold} variant="body2">
					{stats ? calculateTotalActivities(stats) : "N/A"}
				</Typography>
			</Grid>
		</Grid>
	);
};

CardBody.propTypes = {
	profile: PropTypes.object.isRequired,
	stats: PropTypes.object
};

export default CardBody;
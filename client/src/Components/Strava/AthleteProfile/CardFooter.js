import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { formatUTC } from "../helpers";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	bold: {
		fontWeight: "bold"
	},
	latestActivity: {
		padding: `${theme.spacing(1)}px 0`,
		borderTop: "1px solid lightgray"
	},
	memberSince: {
		padding: `${theme.spacing(1)}px 0 0`,
		margin: `${theme.spacing(1)}px 0`,
		borderTop: "1px solid lightgray"
	}
}));

const CardFooter = ({ profile, activities }) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Grid container item className={classes.latestActivity}>
				<Grid item>
					<Typography variant="body2" className={classes.bold}>Latest Activity:</Typography>
				</Grid>
				{activities && activities.length > 0 && (
					<Grid container item spacing={1}>
						<Grid item>
							<Typography variant="body2">{activities[0].name}</Typography>
						</Grid>
						<Grid item>•</Grid>
						<Grid item>
							<Typography variant="body2">
								{formatUTC(activities[0].start_date_local, "MMMM Do, YYYY")}
							</Typography>
						</Grid>
					</Grid>
				)}
			</Grid>
			<Grid container item spacing={1} className={classes.memberSince}>
				<Grid item>
					<Typography variant="body2" className={classes.bold}>Member Since:</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body2">{formatUTC(profile.created_at, "MMMM Do, YYYY")}</Typography>
				</Grid>
			</Grid>
		</Fragment>
	);
};

CardFooter.propTypes = {
	profile: PropTypes.object.isRequired,
	activities: PropTypes.array
};

export default CardFooter;
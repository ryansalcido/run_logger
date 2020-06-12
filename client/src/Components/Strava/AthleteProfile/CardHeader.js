import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	profileAvatar: {
		borderRadius: "50%",
		position: "absolute",
		top: -30
	},
	bold: {
		fontWeight: "bold"
	},
	profileName: {
		marginTop: 20
	}
}));

const CardHeader = ({ profile }) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Grid container item xs={12} justify="center">
				<img src={profile.profile} alt="Profile Avatar" className={classes.profileAvatar} 
					height="70" width="70" />
			</Grid>
			<Grid item xs={12} className={classes.profileName}>
				<Typography className={classes.bold} variant="h5" align="center">
					{`${profile.firstname} ${profile.lastname}`}
				</Typography>
			</Grid>
			{profile.city && profile.state &&
				<Grid item xs={12}>
					<Typography variant="body2" align="center">{`${profile.city}, ${profile.state}`}</Typography>
				</Grid>
			}
		</Fragment>
	);
};

CardHeader.propTypes = {
	profile: PropTypes.object.isRequired
};

export default CardHeader;
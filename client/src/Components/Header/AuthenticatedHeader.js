import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StravaContext } from "../../Context/StravaContext";

const useStyles = makeStyles(() => ({
	profileIcon: {
		borderRadius: "50%"
	}
}));

const AuthenticatedHeader = () => {
	const classes = useStyles();
	const { profile } = useContext(StravaContext);

	return (
		<Fragment>
			<img src={profile.profile_medium} height="36" width="36" className={classes.profileIcon} alt="Profile" />
		</Fragment>
	);
};

export default AuthenticatedHeader;
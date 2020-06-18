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
	const { profile, logout } = useContext(StravaContext);

	return (
		<Fragment>
			<img className={classes.profileIcon} src={profile.profile_medium} height="36" width="36"
				alt="Profile" onClick={() => logout("You have successfully been logged out")} />
		</Fragment>
	);
};

export default AuthenticatedHeader;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ConnectWithStrava from "../../assets/images/ConnectWithStrava.png";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
	stravaConnectButton: {
		padding: 0,
		borderRadius: 4
	}
}));

const StravaLoginButton = (props) => {
	const { height } = props;
	const classes = useStyles();

	const baseUrl = process.env.NODE_ENV === "production"
		? process.env.REACT_APP_NODE_BASE_URL_PROD
		: "http://localhost:8443/run-logger/";

	return (
		<IconButton className={classes.stravaConnectButton} href={`${baseUrl}auth/login`}>
			<img src={ConnectWithStrava} height={height} alt="Connect with Strava" />
		</IconButton>
	);
};

StravaLoginButton.propTypes = {
	height: PropTypes.string.isRequired
};

export default StravaLoginButton;
import React from "react";
import Button from "@material-ui/core/Button";
import StravaIcon from "../assets/Strava.png";

const Login = () => {

	return (
		<Button variant="contained" href="http://localhost:8443/strava/auth/login"
			startIcon={<img src={StravaIcon} alt="Strava" height="25" width="25"/>}>
			Log In with Strava
		</Button>
	);
};

export default Login;
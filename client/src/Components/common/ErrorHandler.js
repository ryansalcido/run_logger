import React, { useContext } from "react";
import { StravaContext } from "../../Context/StravaContext";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const createMessage = (error) => {
	const { errors } = error && error.response && error.response.data;
	if(errors && errors.length > 0) {
		if(errors[0].field === "activity:read_permission") {
			//During Strava authorization, user revoked application's access to read activities
			return "Run Logger was not given read privileges for user's activities during the login process. "
				+ "Please logout and log back in to provide the required accesses.";
		} else if(errors[0].code === "invalid" && errors[0].resource === "Application") {
			//session has ended/expired
			return null;
		} else if(errors[0].code === "invalid" && errors[0].resource === "Activity") {
			//Unable to lookup activity by ID
			return "There was an error trying to retrieve the activity record. Please try again.";
		}
	}
	//default message
	return "Unable to retrieve Strava data due to network issues. Please try again.";
};

const ErrorHandler = ({ error, variant, align, className }) => {
	const { logout } = useContext(StravaContext);

	const message = createMessage(error);
	if(message) {
		return <Typography className={className} align={align} variant={variant}>{message}</Typography>;
	} else { //Log user out since session has expired
		logout("Your session has expired. Please log back in.");
		return null;
	}
};

ErrorHandler.propTypes = {
	error: PropTypes.object.isRequired,
	variant: PropTypes.string,
	align: PropTypes.string,
	className: PropTypes.string
};

ErrorHandler.defaultProps = {
	variant: "body1",
	align: "inherit",
	className: ""
};

export default ErrorHandler;
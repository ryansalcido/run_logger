import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { StravaContext } from "../Context/StravaContext";
import PropTypes from "prop-types";

const AuthenticatedRoute = ({component: Component, ...rest}) => {
	const { isAuthenticated } = useContext(StravaContext);
	return (
		<Route {...rest} render={(props) => {
			if(isAuthenticated) {
				return <Component {...props} />;
			} else {
				return <Redirect to={{pathname: "/", state: {from: props.location}}} />;
			}
		}} />
	);
};

AuthenticatedRoute.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.object
};

export default AuthenticatedRoute;
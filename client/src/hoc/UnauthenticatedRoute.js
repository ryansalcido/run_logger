import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { StravaContext } from "../Context/StravaContext";
import PropTypes from "prop-types";

const UnauthenticatedRoute = ({component: Component, ...rest}) => {
	const { isAuthenticated } = useContext(StravaContext);
	return (
		<Route {...rest} render={(props) => {
			if(isAuthenticated) {
				return <Redirect to={{pathname: "/dashboard", state: {from: props.location}}} />;
			} else {
				return <Component {...props} />;
			}
		}} />
	);
};

UnauthenticatedRoute.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.object
};

export default UnauthenticatedRoute;
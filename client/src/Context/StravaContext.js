import React, { Fragment, createContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Loading from "../Components/common/Loading";
import axiosInstance from "../utils/axiosInstance";

const useStyles = makeStyles(() => ({
	loadingApp: {
		minHeight: "inherit",
		backgroundColor: "#303030",
		//Set height to a value guaranteed to be less than minHeight to fix alignItems bug in IE11
		//Without manually settting height, content is not vertically aligned
		height: "5px"
	},
	loadingRunnerIcon: {
		fontSize: 100
	}
}));

export const StravaContext = createContext();

const StravaProvider = ({ children }) => {
	const classes = useStyles();
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ profile, setProfile ] = useState(null);
	const [ activities, setActivities ] = useState(null);
	const [ isAuthenticated, setIsAuthenticated ] = useState(false);

	useEffect(() => {
		let source = axiosInstance.CancelToken.source();
		axiosInstance.get("athlete", {cancelToken: source.token}).then(res => {
			const { profile } = res.data;
			setIsAuthenticated(true);
			setProfile(profile);
			setIsLoaded(true);
		}).catch(() => {
			setIsAuthenticated(false);
			setProfile(null);
			setIsLoaded(true);
		});

		return () => source.cancel();
	}, []);

	return (
		<Fragment>
			{isLoaded
				? (
					<StravaContext.Provider value={{profile, setProfile, activities, setActivities, isAuthenticated}}>
						{ children }
					</StravaContext.Provider>
				)
				:	(
					<Grid className={classes.loadingApp} container alignItems="center" justify="center">
						<Loading className={classes.loadingRunnerIcon} />
					</Grid>
				)
			}
		</Fragment>
	);
};

StravaProvider.propTypes = {
	children: PropTypes.object.isRequired
};

export default StravaProvider;
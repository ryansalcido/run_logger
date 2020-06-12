import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import StravaLoginButton from "../common/StravaLoginButton";
import { StravaContext } from "../../Context/StravaContext";
import AuthenticatedHeader from "./AuthenticatedHeader";

const useStyles = makeStyles(theme => ({
	appBar: {
		minHeight: 40
	},
	toolbar: {
		minHeight: 40
	},
	headerButton: {
		color: "white",
		border: "1px solid white",
		marginRight: theme.spacing(1),
		"&:hover": {
			textDecoration: "none"
		}
	},
	stravaConnectButton: {
		padding: 0,
		borderRadius: 4
	},
	gridItemButtons: {
		display: "flex",
		alignItems: "center"
	},
	runLoggerHomeLink: {
		textDecoration: "none",
		color: "white"
	}
}));

const Header = () => {
	const classes = useStyles();

	const { isAuthenticated } = useContext(StravaContext);

	return (
		<AppBar color="primary" position="static" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography className={classes.runLoggerHomeLink} variant="h5" component={Link} to={"/"}>
							RUN LOGGER
						</Typography>
					</Grid>
					<Grid item className={classes.gridItemButtons}>
						{isAuthenticated 
							? <AuthenticatedHeader />
							: <StravaLoginButton height="40"/>
						}
					</Grid>				
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
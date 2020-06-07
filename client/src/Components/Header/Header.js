import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import StravaLoginButton from "../common/StravaLoginButton";
import { StravaContext } from "../../Context/StravaContext";
import AuthenticatedHeader from "./AuthenticatedHeader";

const useStyles = makeStyles((theme) => ({
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
						<Typography variant="h5">RUN LOGGER</Typography>
					</Grid>
					<Grid item className={classes.gridItemButtons}>
						{isAuthenticated 
							? <AuthenticatedHeader />
							: (
								<Fragment>
									<Button className={classes.headerButton} variant="outlined"
										component={Link} to={"/"} >
										home
									</Button>
									<StravaLoginButton height="40"/>
								</Fragment>
							)
						}
					</Grid>				
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
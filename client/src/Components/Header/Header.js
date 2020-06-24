import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import StravaLoginButton from "../common/StravaLoginButton";
import { StravaContext } from "../../Context/StravaContext";
import NavigationMenu from "./NavigationMenu";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(() => ({
	appBar: {
		minHeight: 40
	},
	toolbar: {
		minHeight: 40
	},
	runLoggerHomeLink: {
		textDecoration: "none",
		color: "white"
	}
}));

const Header = () => {
	const classes = useStyles();

	const history = useHistory();
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
					{isAuthenticated 
						? <NavigationMenu /> 
						: (
							<Fragment>
								<Hidden smDown>
									<Grid container item justify="flex-end" alignItems="center" xs={8} spacing={4}>
										<Button onClick={() => history.push("/")}>home</Button>
										<Button onClick={() => history.push("/pace-calculator")}>pace calculator</Button>
										<StravaLoginButton height="40"/>
									</Grid>
								</Hidden>
								<Hidden mdUp>
									<NavigationMenu />
								</Hidden>
							</Fragment>
						)}
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
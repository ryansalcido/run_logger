import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

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
		margin: `0 ${theme.spacing(1)}px`,
		"&:hover": {
			textDecoration: "none"
		}
	}
}));

const Header = () => {
	const classes = useStyles();

	return (
		<AppBar color="primary" position="static" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="h5">RUN LOGGER</Typography>
					</Grid>
					<Grid item>
						<Button className={classes.headerButton} variant="outlined"
							component={Link} to={"/"} >
							home
						</Button>
						<Button className={classes.headerButton} variant="outlined"
							component={Link} to={"/login"} >
							log in
						</Button>
					</Grid>					
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
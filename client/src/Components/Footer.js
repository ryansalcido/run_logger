import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PwrdByStrava from "../assets/images/PwrdByStrava.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	footer: {
		minHeight: 30,
		width: "100%",
		bottom: 0,
		position: "absolute",
		backgroundColor: theme.palette.primary.main
	}
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Grid container alignItems="center" wrap="nowrap">
				<Grid item zeroMinWidth>
					<img src={PwrdByStrava} height="25" alt="Powered by Strava" />
				</Grid>
			</Grid>
		</footer>
	);
};

export default Footer;
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StravaLoginButton from "./common/StravaLoginButton";
import { StravaContext } from "../Context/StravaContext";
import Track from "../assets/images/Track.png";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	homeRoot: {
		padding: theme.spacing(3)
	},
	permissionsContainer: {
		margin: `${theme.spacing(2)}px 0 0 4px`,
		padding: theme.spacing(2)
	},
	paceCalculatorButton: {
		height: 40,
		marginTop: 4,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		color: "black",
		"&:hover": {
			backgroundColor: "rgba(255, 255, 255, 0.7)",
			color: "black"
		}
	},
	rightParentContainer: {
		marginTop: 5
	},
	trackImage: {
		maxWidth: 415,
		width: "inherit"
	}
}));

const Home = () => {
	const classes = useStyles();

	const history = useHistory();
	const { isAuthenticated } = useContext(StravaContext);

	const createPaceCalculatorButton = () => {
		return (
			<Button variant="contained" color="secondary" className={classes.paceCalculatorButton}
				onClick={() => history.push("/pace-calculator")}>
				pace calculator
			</Button>
		);
	};

	return (
		<div className={classes.homeRoot}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Hidden smUp>
						<Typography variant="h5" align="center">Welcome to Run Logger</Typography>
					</Hidden>
					<Hidden only="xs">
						<Typography variant="h3" align="center">Welcome to Run Logger</Typography>
					</Hidden>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" align="center">
						View your Strava profile and running activities at a glance
					</Typography>
				</Grid>
				<Hidden mdUp>
					<Grid container item xs={12} justify="space-around">
						{!isAuthenticated && <StravaLoginButton height="48" />}
						{createPaceCalculatorButton()}
					</Grid>
				</Hidden>
				<Grid container item xs={12} md={6} lg={5} justify="center">
					<img src={Track} alt="Track" className={classes.trackImage} />
				</Grid>
				<Grid container item direction="column" xs={12} md={6} className={classes.rightParentContainer}>
					<Hidden smDown>
						<Grid container item justify="space-between">
							{!isAuthenticated && <StravaLoginButton height="48" />}
							{createPaceCalculatorButton()}
						</Grid>
					</Hidden>
					<Grid item>
						<Paper elevation={3} className={classes.permissionsContainer}>
							<Grid item>
								<Typography>
									To provide the best user experience, Run Logger requests access to:
								</Typography>
							</Grid>
							<Grid item>
								<List dense>
									{["View your complete Strava profile", 
										"View data about all your Strava activities"].map(permission => {
										return (
											<ListItem key={permission}>
												<ListItemIcon>
													<VisibilityIcon />
												</ListItemIcon>
												<ListItemText primary={permission} />
											</ListItem>
										);
									})}
								</List>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
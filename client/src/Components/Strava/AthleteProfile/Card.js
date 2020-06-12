import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StravaContext } from "../../../Context/StravaContext";
import axiosInstance from "../../../utils/axiosInstance";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

const useStyles = makeStyles(theme => ({
	profileRoot: {
		marginTop: 57,
		padding: theme.spacing(1),
		position: "relative"
	},
	profileCard: {
		backgroundColor: "white",
		color: "black",
		padding: theme.spacing(2)
	}
}));

const Card = () => {
	const classes = useStyles();
	const [ stats, setStats ] = useState(null);
	const { profile, activities } = useContext(StravaContext);
	
	useEffect(() => {
		let source = axiosInstance.CancelToken.source();
		axiosInstance.get(`athlete/${profile.id}/stats`, {cancelToken: source.token}).then(res => {
			const { result } = res.data;
			setStats(result);
		}).catch(error => {
			if(!axiosInstance.isCancel(error)) {
				setStats(null);
			}
		});

		return () => source.cancel();
	}, [profile.id]);

	return (
		<div className={classes.profileRoot}>
			<Grid container>
				<Grid item xs={12}>
					<Paper elevation={3} className={classes.profileCard}>
						<Grid container item>
							<CardHeader profile={profile} />
							<CardBody profile={profile} stats={stats} />
							<CardFooter profile={profile} activities={activities} />
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Card;
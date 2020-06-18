import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StravaContext } from "../../../Context/StravaContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import SkeletonLoading from "../../common/SkeletonLoading";
import useStravaAxios from "../../../hooks/useStravaAxios";

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
	const { profile, activities } = useContext(StravaContext);
	const { data: stats, isLoading } = useStravaAxios(`athlete/${profile.id}/stats`);

	return (
		<div className={classes.profileRoot}>
			{isLoading
				? <SkeletonLoading height={250} />
				: (
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
				)
			}
		</div>
	);
};

export default Card;
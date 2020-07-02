import React, { useState, useContext, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StravaContext } from "../../Context/StravaContext";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Run from "../../assets/images/Run.png";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import KudosCommentsDialog from "./KudosCommentsDialog";
import LeafletMap from "./LeafletMap";
import { useHistory } from "react-router-dom";
import { convertMetersToMiles, formatUTC, calculateMovingTime, 
	calculateAveragePace, createRunStatColumn} from "../../utils/helpers";

const useStyles = makeStyles(theme => ({
	activityRoot: {
		padding: theme.spacing(1)
	},
	activityCard: {
		backgroundColor: "white",
		color: "black",
		padding: theme.spacing(2)
	},
	profileAvatar: {
		borderRadius: "50%"
	},
	activityImageItem: {
		width: 60
	},
	leafletMap: {
		height: 250,
		width: "100%"
	},
	bold: {
		fontWeight: "bold"
	},
	kudosCommentButton: {
		color: "black"
	},
	divider: {
		width: "100%",
		backgroundColor: "lightgray"
	},
	activityTitle: {
		fontWeight: "bold",
		wordBreak: "break-word",
		//Fix IE11 error as "break-word" value does not work with "word-break" property
		wordWrap: "break-word"
	}
}));

const Activity = forwardRef(({ activity }, ref) => {
	const classes = useStyles();
	const history = useHistory();
	const { profile } = useContext(StravaContext);
	const [ selectedActivity, setSelectedActivity ] = useState(null);

	const handleSelectedActivity = (activity, type) => {
		const { id, name, kudos_count, comment_count } = activity;
		setSelectedActivity(
			{type, id, name, kudos_count, comment_count, avatar: profile.profile_medium}
		);
	};

	return (
		<div ref={ref} className={classes.activityRoot}>
			{selectedActivity &&
				<KudosCommentsDialog activity={selectedActivity} setSelectedActivity={setSelectedActivity} />
			}
			<Grid container>
				<Grid item xs={12}>
					<Paper elevation={3} className={classes.activityCard}>
						<Grid container item>
							<Grid item xs={2} sm={2} md={3} lg={2}>
								<img src={profile.profile_medium} alt="Profile Avatar" 
									className={classes.profileAvatar} height="45" width="45" />
							</Grid>
							<Grid container item xs={10} sm={10} md={9} lg={10} direction="column">
								<Grid item>
									<Typography variant="body2" className={classes.bold}>{`${profile.firstname} ${profile.lastname}`}</Typography>
								</Grid>
								<Grid item>
									<Typography variant="caption">
										{formatUTC(activity.start_date_local, "MMMM Do, YYYY")} at {formatUTC(activity.start_date_local, "h:mm A")}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs={2} sm={2} md={3} lg={2}>
								{activity.type === "Run" && <img src={Run} alt="Running shoe" width="35" height="25" />}
							</Grid>
							<Grid container item direction="column" xs={10} sm={10} md={9} lg={10}>
								<Grid item>
									<Typography variant="body1" className={classes.activityTitle} onClick={() => history.push(`/activities/${activity.id}`)}>
										{activity.name}
									</Typography>
								</Grid>
								<Grid container item>
									{createRunStatColumn("Distance", activity.distance, "mi", convertMetersToMiles)}
									{createRunStatColumn("Time", activity.moving_time, "s", calculateMovingTime)}
									<Grid item xs={4}>
										<Grid item>
											<Typography align="center">Avg. Pace</Typography>
										</Grid>
										<Grid item>
											<Typography align="center">{calculateAveragePace(activity.moving_time, activity.distance)}/mi</Typography>
										</Grid>
									</Grid>
								</Grid>								
							</Grid>
							<Grid item className={classes.leafletMap}>
								<LeafletMap polyline={activity.map.summary_polyline}
									mapProps={{dragging: false, zoom: false, doubleClickZoom: false, scrollWheelZoom: false, zoomControl: false, touchZoom: false}} />
							</Grid>
							<Grid container item justify="space-between">
								<Divider className={classes.divider} />
								<Grid item xs={6}>
									<Button className={classes.kudosCommentButton} startIcon={<ThumbUpOutlinedIcon />}
										onClick={() => handleSelectedActivity(activity, "kudos")} >
										{activity.kudos_count}
									</Button>
								</Grid>
								<Grid container item xs={6} alignItems="center" justify="flex-end">
									<Button className={classes.kudosCommentButton} startIcon={<CommentOutlinedIcon />}
										onClick={() => handleSelectedActivity(activity, "comments")}>
										{activity.comment_count}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
});

Activity.displayName = "Activity";

Activity.propTypes = {
	activity: PropTypes.object.isRequired
};

export default Activity;
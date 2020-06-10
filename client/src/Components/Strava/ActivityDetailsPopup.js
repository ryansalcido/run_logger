import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Grid from "@material-ui/core/Grid";
import ActivityKudosView from "./ActivityKudosView";
import ActivityCommentsView from "./ActivityCommentsView";
import axiosInstance from "../../utils/axiosInstance";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	profileAvatar: {
		borderRadius: "50%"
	},
	badgeItem: {
		paddingLeft: 8
	}
}));

const getCommentKudosCountByType = (activity) => {
	if(activity.type === "kudos") return activity.kudos_count;
	if(activity.type === "comments") return activity.comment_count;
};

const ActivityDetailsPopup = ({ activity, setSelectedActivity }) => {
	const classes = useStyles();

	const [ data, setData ] = useState(null);
	const [ isDetailsPopupOpen, setIsDetailsPopupOpen ] = useState(false);

	useEffect(() => {
		let source = axiosInstance.CancelToken.source();
		axiosInstance.get(`activities/${activity.id}/${activity.type}`, 
			{cancelToken: source.token})
			.then(res => {
				const { result } = res.data;
				setData(result);
				setIsDetailsPopupOpen(true);
			}).catch(error => {
				if(!axiosInstance.isCancel(error)) {
					setData(null);
					setIsDetailsPopupOpen(false);
				}
			});
		return () => source.cancel();
	}, [activity.id, activity.type]);

	const handleClose = () => {
		setIsDetailsPopupOpen(false);
		setSelectedActivity(null);
	};

	return (
		<Fragment>
			{data && <Dialog disableScrollLock fullWidth open={isDetailsPopupOpen} onClose={handleClose}>
				<DialogTitle disableTypography>
					<Grid container justify="space-between" alignItems="center">
						<Grid container item alignItems="center" xs={11}>
							<Grid item xs={2}>
								{activity.avatar && 
									<img src={activity.avatar} className={classes.profileAvatar} 
										alt="Profile Avatar" height="50" width="50" />
								}
							</Grid>
							<Grid item xs={8}>
								<Typography variant="h6">{activity.name}</Typography>
							</Grid>
							<Grid item xs={1} className={classes.badgeItem}>
								<Badge badgeContent={getCommentKudosCountByType(activity)} color="primary" showZero>
									{activity.type === "kudos" && <ThumbUpOutlinedIcon />}
									{activity.type === "comments" && <CommentOutlinedIcon />}
								</Badge>
							</Grid>
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" onClick={handleClose}>
								<ClearOutlinedIcon />
							</IconButton>
						</Grid>
					</Grid>
				</DialogTitle>
				{activity.type === "kudos" && <ActivityKudosView kudos={data} />}
				{activity.type === "comments" && <ActivityCommentsView comments={data} />}
			</Dialog>}
		</Fragment>
	);
};

ActivityDetailsPopup.propTypes = {
	setSelectedActivity: PropTypes.func.isRequired,
	activity: PropTypes.exact({
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		kudos_count: PropTypes.number.isRequired,
		comment_count: PropTypes.number.isRequired,
		avatar: PropTypes.string
	})
};

export default ActivityDetailsPopup;
import React from "react";
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
import KudosView from "./KudosView";
import CommentsView from "./CommentsView";
import ErrorHandler from "../common/ErrorHandler";
import useStravaAxios from "../../hooks/useStravaAxios";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	profileAvatar: {
		borderRadius: "50%"
	},
	badgeItem: {
		paddingLeft: 8
	},
	errorText: {
		padding: 8,
		fontStyle: "italic"
	}
}));

const getCommentKudosCountByType = (activity) => {
	if(activity.type === "kudos") return activity.kudos_count;
	if(activity.type === "comments") return activity.comment_count;
};

const KudosCommentsDialog = ({ activity, setSelectedActivity }) => {
	const classes = useStyles();

	const { data, isLoading, error, setResult } = 
		useStravaAxios(`activities/${activity.id}/${activity.type}`);

	const handleClose = () => {
		setResult({data: null, isLoading: false, error: null});
		setSelectedActivity(null);
	};

	return (
		<Dialog disableScrollLock fullWidth open={!isLoading} onClose={handleClose}>
			<DialogTitle disableTypography>
				<Grid container justify="space-between" alignItems="center">
					<Grid container item alignItems="center" xs={11}>
						<Grid item xs={3} sm={2}>
							{activity.avatar && 
								<img src={activity.avatar} className={classes.profileAvatar} 
									alt="Profile Avatar" height="50" width="50" />
							}
						</Grid>
						<Grid item xs={7}>
							<Typography variant="h6" noWrap title={activity.name}>{activity.name}</Typography>
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
			{error && <ErrorHandler error={error} align="center" className={classes.errorText} />}
			{activity.type === "kudos" && <KudosView kudos={data} />}
			{activity.type === "comments" && <CommentsView comments={data} />}
		</Dialog>
	);
};

KudosCommentsDialog.propTypes = {
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

export default KudosCommentsDialog;
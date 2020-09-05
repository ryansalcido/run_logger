import React, { useState } from "react";
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
import useAxios from "../../hooks/useAxios";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	profileAvatar: {
		borderRadius: "50%"
	},
	badgeItem: {
		paddingLeft: 8
	},
	errorText: {
		padding: 8,
		fontStyle: "italic"
	},
	dialogRoot: {
		padding: 12
	},
	dialogHeader: {
		borderBottom: "1px solid rgba(240, 240, 245, 0.18)"
	},
	dialogTabContainer: {
		borderBottom: "1px solid rgba(240, 240, 245, 0.18)"
	},
	dialogTab: {
		padding: "16px 24px 8px",
		borderRight: "1px solid rgba(240, 240, 245, 0.18)"
	},
	selectedTab: {
		borderTop: `2px solid ${theme.palette.primary.main}`,
		borderBottom: "none"
	}
}));

// const getCommentKudosCountByType = (activity) => {
// 	if(activity.type === "kudos") return activity.kudos_count;
// 	if(activity.type === "comments") return activity.comment_count;
// };

const KudosCommentsDialog = ({ activity, setSelectedActivity }) => {
	const classes = useStyles();

	const [ selectedTab, setSelectedTab ] = useState(activity.type);

	const { data, isLoading, error, setResult } = 
		useAxios(`activities/${activity.id}/${selectedTab}`);

	const handleClose = () => {
		setResult({data: null, isLoading: false, error: null});
		setSelectedActivity(null);
	};

	return (
		<Dialog disableScrollLock fullWidth open={true} onClose={handleClose}>
			<div className={classes.dialogRoot}>
				<Grid container justify="space-between" alignItems="center" className={classes.dialogHeader}>
					<Grid container item alignItems="center" xs={11}>
						<Grid item xs={3} sm={2}>
							{activity.avatar && 
								<img src={activity.avatar} className={classes.profileAvatar} 
									alt="Profile Avatar" height="50" width="50" />
							}
						</Grid>
						<Grid item xs={8} sm={9}>
							<Typography variant="h6" noWrap title={activity.name}>{activity.name}</Typography>
						</Grid>
					</Grid>
					<Grid item xs={1}>
						<IconButton size="small" onClick={handleClose}>
							<ClearOutlinedIcon />
						</IconButton>
					</Grid>
				</Grid>
				
				<Grid container alignItems="center" className={classes.dialogTabContainer}>
					<Grid item className={classes.dialogTab} onClick={() => setSelectedTab("kudos")}>
						<Badge badgeContent={1000} max={999} color="primary" showZero>
							<ThumbUpOutlinedIcon />
						</Badge>
					</Grid>
					<Grid item className={classes.dialogTab} onClick={() => setSelectedTab("comments")}>
						<Badge badgeContent={activity.comment_count} max={999} color="primary" showZero>
							<CommentOutlinedIcon />
						</Badge>
					</Grid>
				</Grid>
			</div>
			{/* <DialogTitle disableTypography>
				<Grid container justify="space-between" alignItems="center">
					<Grid container item alignItems="center" xs={11}>
						<Grid item xs={3} sm={2}>
							{activity.avatar && 
								<img src={activity.avatar} className={classes.profileAvatar} 
									alt="Profile Avatar" height="50" width="50" />
							}
						</Grid>
						<Grid item xs={8} sm={9}>
							<Typography variant="h6" noWrap title={activity.name}>{activity.name}</Typography>
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
			{activity.type === "comments" && <CommentsView comments={data} />} */}
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
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { createHexColorByString, getUserInitials, formatUTC } from "../../utils/helpers";
import moment from "moment";

const useStyles = makeStyles(() => ({
	commentsList: {
		padding: 8
	},
	commentContainer: {
		"&:not(:last-child)": {
			borderBottom: "1px solid rgba(240,240,245,0.18)"
		}
	},
	noCommentsText: {
		fontStyle: "italic"
	}
}));

const NUM_MS_IN_HOUR = 3600000;

const calculateDate = (utc) => {
	const now = moment().toISOString();
	const differenceNumHours = Math.floor((moment(now).diff(moment(utc)) / NUM_MS_IN_HOUR));
	//If comment was made less than or equal to 24 hours ago, return hours value, else return full date
	return differenceNumHours <= 24 ? `${differenceNumHours} hours ago` : formatUTC(utc, "MM/DD/YYYY");
};

const CommentsView = ({ comments }) => {
	const classes = useStyles();

	return (
		<Fragment>
			{comments &&
				<List className={classes.commentsList}>
					{comments.length === 0 
						? <Typography align="center" className={classes.noCommentsText}>
							This entry has no comments yet.
						</Typography>
						: comments.map(comment => {
							return (
								<Grid container key={comment.id} alignItems="center" className={classes.commentContainer}>
									<Grid item xs={12}>
										<ListItem disableGutters>
											<ListItemAvatar>
												<Avatar 
													style={{
														color: "white", 
														backgroundColor: createHexColorByString(`${comment.athlete.firstname} ${comment.athlete.lastname}`)
													}}>
													{getUserInitials(comment.athlete.firstname, comment.athlete.lastname)}
												</Avatar>
											</ListItemAvatar>
											<Grid container direction="column">
												<Grid container item justify="space-between">
													<Typography variant="body2">
														{`${comment.athlete.firstname} ${comment.athlete.lastname}`}
													</Typography>
													<Typography variant="body2">{calculateDate(comment.created_at)}</Typography>
												</Grid>
												<Grid item>
													<ListItemText primary={comment.text} />
												</Grid>
											</Grid>
										</ListItem>
									</Grid>
								</Grid>
							);
						})}
				</List>
			}
		</Fragment>
	);
};

CommentsView.propTypes = {
	comments: PropTypes.array
};

CommentsView.defaultProps = {
	comments: null
};

export default CommentsView;
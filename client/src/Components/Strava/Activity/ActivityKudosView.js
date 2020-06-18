import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { createHexColorByString, getUserInitials } from "../helpers";

const useStyles = makeStyles(() => ({
	kudosList: {
		padding: 8,
		"& li": {
			"&:not(:last-child)": {
				borderBottom: "1px solid rgba(240,240,245,0.18)"
			}
		}
	},
	noKudosText: {
		fontStyle: "italic"
	}
}));

const ActivityKudosView = ({ kudos }) => {
	const classes = useStyles();

	return (
		<Fragment>
			{kudos &&
				<List className={classes.kudosList}>
					{kudos.length === 0
						? <Typography align="center" className={classes.noKudosText}>This entry has no kudos yet.</Typography>
						: kudos.map(kudo => {
							return (
								<ListItem key={`${kudo.firstname} ${kudo.lastname}`} disableGutters>
									<ListItemAvatar>
										<Avatar 
											style={{
												color: "white", 
												backgroundColor: createHexColorByString(`${kudo.firstname} ${kudo.lastname}`)
											}}>
											{getUserInitials(kudo.firstname, kudo.lastname)}
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={`${kudo.firstname} ${kudo.lastname}`} />
								</ListItem>
							);
						})
					}
				</List>
			}
		</Fragment>
	);
};

ActivityKudosView.propTypes = {
	kudos: PropTypes.array
};

ActivityKudosView.defaultProps = {
	kudos: null
};

export default ActivityKudosView;
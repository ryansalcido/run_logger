import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

const SummaryView = ({ activity, avatar }) => {

	console.log("ACTIVITY: ", activity, avatar);
	return (
		<Grid container spacing={1} justify="center">
			<Grid item xs={12} sm={10}>
				<Paper elevation={3}>
					<Grid container item>
						<Grid item xs={12} sm={6}>
							asdasdasd
						</Grid>
						<Grid item xs={12} sm={6}>
							1qweqweqweqwe
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

SummaryView.propTypes = {
	activity: PropTypes.object.isRequired,
	avatar: PropTypes.string.isRequired
};

export default SummaryView;
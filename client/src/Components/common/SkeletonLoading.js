import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	skeletonLoadingRoot: {
		padding: theme.spacing(2)
	}
}));

const SkeletonLoading = ({ height }) => {
	const classes = useStyles();

	return (
		<div className={classes.skeletonLoadingRoot}>
			<Grid container direction="column" spacing={3}>
				{[0, 1, 2, 3].map(idx => {
					return (
						<Grid item key={idx} xs={12} sm={11} md={5}>
							<Skeleton variant="rect" height={height} />
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

SkeletonLoading.propTypes = {
	height: PropTypes.number
};

export default SkeletonLoading;
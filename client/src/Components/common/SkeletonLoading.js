import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	skeletonLoadingRoot: {
		padding: theme.spacing(2)
	}
}));

const SkeletonLoading = ({ numPlaceholders, height }) => {
	const classes = useStyles();

	return (
		<div className={classes.skeletonLoadingRoot}>
			<Grid container direction="column" spacing={3}>
				{[...Array(numPlaceholders).keys()].map(idx => {
					return (
						<Grid item key={idx}>
							<Skeleton variant="rect" height={height} />
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

SkeletonLoading.propTypes = {
	numPlaceholders: PropTypes.number,
	height: PropTypes.number
};

SkeletonLoading.defaultProps = {
	numPlaceholders: 1,
	height: 50
};

export default SkeletonLoading;
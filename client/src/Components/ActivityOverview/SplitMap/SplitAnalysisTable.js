import React, { Fragment, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { convertMetersToFeet } from "../../../utils/helpers";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const METERS_IN_MILE = 1609;
const ONE_MILE = 1;
const ZERO_MILES = 0;

const useStyles = makeStyles(() => ({
	splitTableContainer: {
		height: 274
	},
	splitTableHeader: {
		paddingBottom: 16,
		borderBottom: "1px solid rgba(81, 81, 81, 1)"
	}
}));

const convertMetersToMiles = (meters) => {
	return Number((meters / METERS_IN_MILE).toFixed(1));
};

const calculatePace = (seconds, meters) => {
	const secondsPerMile = seconds / (meters / METERS_IN_MILE);
	return `${Math.floor(secondsPerMile % 3600 / 60)}:${Math.floor(secondsPerMile % 60) < 10 ? "0" + Math.floor(secondsPerMile % 60) : Math.floor(secondsPerMile % 60)}`;
};

const SplitAnalysisTable = ({ splits }) => {
	const classes = useStyles();

	return (
		<Paper elevation={3}>
			<Typography variant="h4" align="center" className={classes.splitTableHeader}>Splits</Typography>
			<TableContainer className={classes.splitTableContainer}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell align="center">Mile</TableCell>
							<TableCell align="center">Pace</TableCell>
							<TableCell align="center">Elev</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{splits && splits.map(split => (
							<Fragment key={split.split}>
								{convertMetersToMiles(split.distance) > ZERO_MILES &&
									<TableRow>
										<TableCell align="center">
											{convertMetersToMiles(split.distance) < ONE_MILE 
												? convertMetersToMiles(split.distance) : split.split}
										</TableCell>
										<TableCell align="center">{calculatePace(split.moving_time, split.distance)}/mi</TableCell>
										<TableCell align="center">{convertMetersToFeet(split.elevation_difference, true)}</TableCell>
									</TableRow>
								}
							</Fragment>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

SplitAnalysisTable.propTypes = {
	splits: PropTypes.array
};

export default memo(SplitAnalysisTable);
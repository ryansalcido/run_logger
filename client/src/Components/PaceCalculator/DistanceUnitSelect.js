import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const distanceUnits = [
	{ value: "mi" },
	{ value: "km"}
];

const useStyles = makeStyles(() => ({
	outlinedRoot: {
		"&:hover $notchedOutline": {
			border: "1px solid white"
		},
		"&$focused $notchedOutline": {
			border: "1px solid white"
		}
	},
	notchedOutline: {},
	focused: {}
}));

const DistanceUnitSelect = (props) => {
	const classes = useStyles();

	return (
		<TextField select variant="outlined" SelectProps={{native: true}} fullWidth size="small"
			InputProps={{
				classes: {
					root: classes.outlinedRoot,
					notchedOutline: classes.notchedOutline,
					focused: classes.focused
				}
			}}
			{...props}>
			{distanceUnits.map(unit => (
				<option key={unit.value} value={unit.value}>
					{unit.value}
				</option>
			))}
		</TextField>
	);
};

export default DistanceUnitSelect;
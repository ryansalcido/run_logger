import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CalculatorIcon from "../common/CalculatorIcon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
	calculatorIconButton: {
		height: 40,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		borderRadius: 4,
		"&:hover": {
			backgroundColor: "rgba(255, 255, 255, 0.7)"
		}
	},
	calculatorIcon: {
		width: 15,
		height: 15
	}
}));

const CalculateButton = ({ onClick }) => {
	const classes = useStyles();

	return (
		<IconButton className={classes.calculatorIconButton} onClick={onClick}>
			<CalculatorIcon className={classes.calculatorIcon} />
		</IconButton>
	);
};

CalculateButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default CalculateButton;
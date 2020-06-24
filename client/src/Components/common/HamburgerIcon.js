import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	hamburgerIcon: {
		"& $line": {
			width: 24,
			height: 3,
			backgroundColor: "white",
			display: "block",
			margin: "4px auto",
			transition: "all 0.3s ease-in-out"
		},
		"& .isActive": {
			"&:nth-child(2)": {
				opacity: 0
			},
			"&:nth-child(1)": {
				transform: "translateY(5px) rotate(45deg)"
			},
			"&:nth-child(3)": {
				transform: "translateY(-9px) rotate(-45deg)"
			}
		}
	},
	line: {}
}));

const HamburgerIcon = ({ value }) => {
	const classes = useStyles();

	return (
		<div className={classes.hamburgerIcon}>
			{/* If value prop is truthy, add isActive class to trigger animation*/}
			{[0, 1, 2].map(idx => (
				<span key={idx} className={`${classes.line} ${value ? "isActive" : ""}`} />
			))}
		</div>
	);
};

HamburgerIcon.propTypes = {
	//Ideally, value prop can be any type, but sticking to object and string for now
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	])
};

export default HamburgerIcon;
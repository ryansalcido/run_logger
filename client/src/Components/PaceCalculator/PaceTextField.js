import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
	//Remove input number spinners when TextField is active
	textFieldRoot: {
		"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
			"-webkit-appearance": "none",
			margin: 0
		},
		//Remove specifically for Firefox
		"& input[type=number]": {
			"-moz-appearance": "textfield"
		}
	},
	outlinedRoot: {
		"&:hover $notchedOutline": {
			border: "1px solid white"
		},
		"&$focused $notchedOutline": {
			border: "1px solid white"
		}
	},
	helperText: {
		textAlign: "center"
	},
	notchedOutline: {},
	focused: {}
}));

const PaceTextField = (props) => {
	const classes = useStyles();

	return (
		<TextField variant="outlined" size="small" fullWidth 
			className={classes.textFieldRoot}
			InputProps={{
				classes: {
					root: classes.outlinedRoot,
					notchedOutline: classes.notchedOutline,
					focused: classes.focused
				},
				inputProps: {
					min: 0
				}
			}}
			FormHelperTextProps={{
				className: classes.helperText
			}}
			{...props}
		/>
	);
};

export default PaceTextField;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	"@keyframes blink": {
		"0%": {
			opacity: 0.1
		},
		"20%": {
			opacity: 1
		},
		"100%": {
			opacity: 0.1
		}
	},
	loadingContainer: {
		"& svg": {
			color: "#AD2323",
			animation: "$blink 1.5s both infinite",
			"&:nth-child(2)": {
				animationDelay: "0.5s"
			},
			"&:nth-child(3)": {
				animationDelay: "1s"
			}
		}
	}
}));

const Loading = (props) => {
	const { className } = props;
	const classes = useStyles();

	return (
		<div className={classes.loadingContainer}>
			{[0, 1, 2].map(idx => {
				return <DirectionsRunIcon key={idx} className={className} />;
			})}
		</div>
	);
};

Loading.propTypes = {
	className: PropTypes.string
};

Loading.defaultProps = {
	className: ""
};

export default Loading;
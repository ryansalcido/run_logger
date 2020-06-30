import React, { memo } from "react";
import PropTypes from "prop-types";

const GoogleStaticMap = ({ polyline }) => {
	return (
		<img alt="Google Map" width="100%" height="100%"
			src={`https://maps.googleapis.com/maps/api/staticmap?size=500x250&path=color:red%7Cenc:${polyline}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} />
	);
};

GoogleStaticMap.propTypes = {
	polyline: PropTypes.string.isRequired
};

export default memo(GoogleStaticMap);
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Map, TileLayer, Polyline } from "react-leaflet";
import "polyline-encoded";
import leaflet from "leaflet";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
	leafletMap: {
		width: "100%",
		height: "100%"
	},
	mapErrorIcon: {
		width: 80,
		height: 80
	}
}));

const createLatLongsFromPoyline = (polyline) => {
	const decodedPolyline = polyline ? leaflet.Polyline.fromEncoded(polyline) : null;
	return decodedPolyline ? decodedPolyline.getLatLngs() : null;
};

const LeafletMap = ({ polyline, lineColor, mapProps }) => {
	const classes = useStyles();
	const coordinates = createLatLongsFromPoyline(polyline);

	return (
		<Fragment>
			{coordinates ? (
				<Map bounds={coordinates} className={classes.leafletMap} {...mapProps}>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
					<Polyline positions={coordinates} color={lineColor} />
				</Map>
			) : (
				<Grid container direction="column" justify="center" alignItems="center" 
					className={classes.leafletMap}>
					<ErrorIcon color="error" className={classes.mapErrorIcon} />
					<Typography variant="h5" align="center">{"Unable to load activity's map"}</Typography>
				</Grid>
			)}
		</Fragment>
	);
};

LeafletMap.propTypes = {
	polyline: PropTypes.string,
	lineColor: PropTypes.string,
	mapProps: PropTypes.object
};

LeafletMap.defaultProps = {
	polyline: null,
	lineColor: "red",
	mapProps: {}
};

export default LeafletMap;
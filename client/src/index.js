import "react-app-polyfill/ie11";
import "intersection-observer";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StravaProvider from "./Context/StravaContext";

ReactDOM.render(
	<StravaProvider>
		<App />
	</StravaProvider>,
	document.getElementById("root")
);
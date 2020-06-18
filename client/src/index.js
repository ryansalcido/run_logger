import "react-app-polyfill/ie11";
import "intersection-observer";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StravaProvider from "./Context/StravaContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
	<Fragment>
		<ToastContainer />
		<StravaProvider>
			<App />
		</StravaProvider>
	</Fragment>,
	document.getElementById("root")
);
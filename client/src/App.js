import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import theme from "./theme";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import PaceCalculator from "./Components/PaceCalculator/PaceCalculator";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";

const App = () => {
	const themeConfig = createMuiTheme(theme);

	return (
		<ThemeProvider theme={themeConfig}>
			<CssBaseline />
			<Router basename={process.env.PUBLIC_URL}>
				<Header />
				<div style={{minHeight: "calc(100vh - 55px)", paddingBottom: 40}}>
					<Switch>
						<Route exact path="/" component={Home} />
						<AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
						<Route exact path="/pace-calculator" component={PaceCalculator} />
					</Switch>
				</div>
				<Footer />
			</Router>
		</ThemeProvider>
	);
};

export default App;
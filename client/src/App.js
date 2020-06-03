import React from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import theme from "./theme";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
	const themeConfig = createMuiTheme(theme);

  return (
    <ThemeProvider theme={themeConfig}>
			<CssBaseline />
			<Router>
				<Header />
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</div>
			</Router>
		</ThemeProvider>
  );
}

export default App;

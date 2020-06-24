import React, { Fragment, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StravaContext } from "../../Context/StravaContext";
import StravaLoginButton from "../common/StravaLoginButton";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import CalculatorIcon from "../common/CalculatorIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HamburgerIcon from "../common/HamburgerIcon";

const useStyles = makeStyles(() => ({
	menuIconButton: {
		padding: 0
	},
	profileIcon: {
		borderRadius: "50%"
	},
	calculatorIcon: {
		width: 24,
		height: 24
	},
	menuItemGutter: {
		padding: "8px 16px"
	},
	connectMenuItemGutter: {
		padding: "4px 16px"
	},
	menuList: {
		padding: 0
	}
}));

const NavigationMenu = () => {
	const classes = useStyles();

	const history = useHistory();
	const { isAuthenticated, profile, logout } = useContext(StravaContext);
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

	const handleClick = (event) => {
		setMenuAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setMenuAnchorEl(null);
	};

	return (
		<Fragment>
			<IconButton onClick={handleClick} className={classes.menuIconButton}>
				{isAuthenticated ? (
					<Fragment>
						<img className={classes.profileIcon} src={profile.profile_medium} height="36" width="36"
							alt="Profile" />
						<ExpandMoreIcon />
					</Fragment>
				) : <HamburgerIcon value={menuAnchorEl} />
				}
			</IconButton>

			<Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)}
				onClose={handleClose} disableScrollLock getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left"
				}}
				MenuListProps={{
					classes: { padding: classes.menuList}
				}}
				PaperProps={{
					style: {
						width: 215
					}
				}}>
				<ListItem button dense divider classes={{gutters: classes.menuItemGutter}}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" 
						onClick={() => {handleClose(); history.push("/");}} />
				</ListItem>
				<ListItem button dense divider classes={{gutters: classes.menuItemGutter}}>
					<ListItemIcon>
						<CalculatorIcon className={classes.calculatorIcon} color="white" />
					</ListItemIcon>
					<ListItemText primary="Pace Calculator" 
						onClick={() => {handleClose(); history.push("/pace-calculator");}} />
				</ListItem>
				{isAuthenticated ? [
					//Menu component does not allow children to be Fragment, need to use array instead
					<ListItem key="Dashboard" button dense divider classes={{gutters: classes.menuItemGutter}}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" 
							onClick={() => {handleClose(); history.push("/dashboard");}} />
					</ListItem>,
					<ListItem key="Logout" button dense classes={{gutters: classes.menuItemGutter}}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" 
							onClick={() => {handleClose(); logout("You have successfully been logged out");}} />
					</ListItem>
				] : (
					<ListItem button dense classes={{gutters: classes.connectMenuItemGutter}}>
						<StravaLoginButton height="40" />
					</ListItem>
				)}
			</Menu>
		</Fragment>
	);
};

export default NavigationMenu;
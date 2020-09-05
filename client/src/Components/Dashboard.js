import React from "react";
import ActivityListView from "./Activity/ActivityListView";
import AthleteProfileCard from "./AthleteProfile/AthleteProfileCard";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

const Dashboard = () => {
	return (
		<div style={{padding: 8}}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={10} md={6} lg={5}>
					<ActivityListView />
				</Grid>
				{/* <Hidden smDown>
					<Grid item xs={12} md={5} lg={4}>
						<AthleteProfileCard />
					</Grid>
				</Hidden> */}
			</Grid>
		</div>
	);
};

export default Dashboard;
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Activity from "./Activity";

const ActivityListView = () => {
	const [ activities, setActivities ] = useState(null);

	useEffect(() => {
		let source = axios.CancelToken.source();

		axios.get("/strava/athlete/activities", {cancelToken: source.token}).then(res => {
			const { activities } = res.data;
			setActivities(activities);
		}).catch(error => {
			if(!axios.isCancel(error)) {
				setActivities(null);
			}
		});
		return () => source.cancel();
	}, []);

	return (
		<Fragment>
			{activities && activities.map(activity => {
				return (
					<Activity key={activity.id} activity={activity} />
				);
			})}
		</Fragment>
	);
};

export default ActivityListView;
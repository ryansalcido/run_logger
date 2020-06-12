import React, { Fragment, useState, useEffect, useContext, useRef, useCallback } from "react";
import { StravaContext } from "../../Context/StravaContext";
import Activity from "./Activity";
import Typography from "@material-ui/core/Typography";
import SkeletonLoading from "../common/SkeletonLoading";
import { useStravaAxios } from "./useStravaAxios";

const ActivityListView = () => {
	const { activities, setActivities } = useContext(StravaContext);
	const [ currentPage, setCurrentPage ] = useState(1);
	const { data, isLoading } = useStravaAxios(`athlete/activities?page=${currentPage}`);

	useEffect(() => setActivities(data), [data, setActivities]);

	const observer = useRef();
	const lastActivityRef = useCallback(node => {
		if(isLoading) return;
		if(observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting) {
				setCurrentPage(currentPage + 1);
			}
		});
		if (observer.current && node) observer.current.observe(node);
	}, [isLoading, currentPage]);

	return (
		<Fragment>
			<Typography variant="h4" style={{padding: 8}}>Your Activities</Typography>
			{activities && 
				activities.map((activity, idx) => {
					return (
						<Activity key={activity.id} activity={activity} 
							ref={activities.length === idx + 1 ? lastActivityRef : null}/>
					);
				})
			}
			{isLoading && <SkeletonLoading height={175} />}
		</Fragment>
	);
};

export default ActivityListView;
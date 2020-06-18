import React, { Fragment, useState, useEffect, useContext, useRef, useCallback } from "react";
import { StravaContext } from "../../../Context/StravaContext";
import Activity from "./Activity";
import Typography from "@material-ui/core/Typography";
import SkeletonLoading from "../../common/SkeletonLoading";
import ErrorHandler from "../../common/ErrorHandler";
import useStravaAxios from "../../../hooks/useStravaAxios";

const ActivityListView = () => {
	const { activities, setActivities } = useContext(StravaContext);
	const [ currentPage, setCurrentPage ] = useState(1);
	const { data, isLoading, error } = useStravaAxios(`athlete/activities?page=${currentPage}`);

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
		if(observer.current && node) observer.current.observe(node);
	}, [isLoading, currentPage]);

	return (
		<Fragment>
			<Typography variant="h4" style={{padding: 8}}>Your Activities</Typography>
			{error && <ErrorHandler error={error} />}
			{activities &&
				activities.map((activity, idx) => {
					return (
						<Activity key={activity.id} activity={activity} 
							ref={activities.length === idx + 1 ? lastActivityRef : null}/>
					);
				})
			}
			{isLoading && <SkeletonLoading numPlaceholders={4} height={175} />}
		</Fragment>
	);
};

export default ActivityListView;
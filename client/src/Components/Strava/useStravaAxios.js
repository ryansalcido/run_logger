import { useState, useEffect } from "react";
import axios from "axios";

export const useStravaAxios = (url) => {
	const [ result, setResult ] = useState({data: null, error: null, isLoading: false});

	useEffect(() => {
		setResult(result => ({ ...result, isLoading: true }));
		let source = axios.CancelToken.source();
		axios.get(url, {cancelToken: source.token}).then(res => {
			const { result } = res.data;
			setResult(prev => ({
				data: prev.data ? [ ...prev.data, ...result ] : result, 
				error: null, 
				isLoading: false
			}));
		}).catch(error => {
			if(!axios.isCancel(error)) {
				setResult({error, data: null, isLoading: false});
			}
		});

		return () => source.cancel();
	}, [url]);

	return result;
};
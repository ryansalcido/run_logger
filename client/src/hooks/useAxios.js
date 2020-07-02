import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useAxios = (url) => {
	const [ result, setResult ] = useState({data: null, error: null, isLoading: false});

	useEffect(() => {
		setResult(result => ({ ...result, isLoading: true}));
		let source = axiosInstance.CancelToken.source();
		axiosInstance.get(url, {cancelToken: source.token}).then(res => {
			const { result } = res.data;
			setResult(prev => ({
				data: prev.data ? [ ...prev.data, ...result ] : result, 
				error: null, 
				isLoading: false
			}));
		}).catch(error => {
			if(!axiosInstance.isCancel(error)) {
				setResult({error, data: null, isLoading: false});
			}
		});

		return () => source.cancel();
	}, [url]);

	return { ...result, setResult };
};

export default useAxios;
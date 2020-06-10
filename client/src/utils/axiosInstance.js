import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NODE_ENV === "production"
		? process.env.REACT_APP_NODE_BASE_URL_PROD
		: process.env.REACT_APP_NODE_BASE_URL_DEV
});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

export default axiosInstance;
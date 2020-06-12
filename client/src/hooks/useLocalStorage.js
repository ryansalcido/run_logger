import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
	const [ value, setValue] = useState(() => {
		const val = localStorage.getItem(key);
		return val ? JSON.parse(val) : defaultValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [ value, setValue ];
};

export default useLocalStorage;
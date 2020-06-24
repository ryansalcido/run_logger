import { useState } from "react";

const useForm = (initState) => {
	const [ state, setState ] = useState(initState);

	const handleChange = (e) => {
		e.persist();
		setState(state => ({...state, [e.target.name]: e.target.value}));
	};

	return  [ state, setState, handleChange ];
};

export default useForm;
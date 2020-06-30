const axios = require("axios");
const stravaBaseUrl = "https://www.strava.com/api/v3";
const defaultErrorMsg = {
	message: "Error retrieving data from Strava",
	errors: [{code: "invalid", field: "unknown", resource: "resource"}]
};

function stravaAxios(user, url) {
	return new Promise((resolve, reject) => {
		axios({url: `${stravaBaseUrl}${url}`, headers: {Authorization: `Bearer ${user.accessToken}`}})
			.then(response => {
				resolve(response.data);
			}).catch(error => {
				if(error && error.response) {
					const { data } = error.response;
					data ? reject(data) : reject(defaultErrorMsg);
				}
				reject(defaultErrorMsg);
			});
	});
}

module.exports = {
	stravaBaseUrl,
	defaultErrorMsg,
	stravaAxios
};
import axiosClient from './axiosClient';

const authApi = {
	login(body) {
		const url = '/authenticate';
		return axiosClient.post(url, body);
	},

	signup(body) {
		const url = '/signup';
		return axiosClient.post(url, body);
	},
};

export default authApi;

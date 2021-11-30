import axiosClient from './axiosClient';

const tagApi = {
	getAll(params) {
		const url = '/tags';
		return axiosClient.get(url, { params });
	},
	getTagsByName(payload) {
		const tagName = payload.tagName;
		const params = payload.newFilter;
		const url = `/tags/${tagName}`;
		return axiosClient.get(url, { params });
	},
};

export default tagApi;

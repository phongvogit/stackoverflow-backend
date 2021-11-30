import axiosClient from './axiosClient';

const questionApi = {
	getAll(params) {
		const url = '/questions';
		return axiosClient.get(url, { params });
	},
	getAllByTags(payload) {
		const url = '/questions/tags/search';
		const tags = [payload.tag];
		const params = payload.filter;
		return axiosClient.post(url, { tags }, { params });
	},
	getById(id) {
		const url = `/question/${id}`;
		return axiosClient.get(url);
	},
	getQuestionsByUsername(username) {
		const url = `/question/user/${username}`;
		return axiosClient.get(url);
	},
	add(body) {
		const url = '/questions';
		return axiosClient.post(url, body);
	},
	removeQuestion(id) {
		const url = `/question/${id}`;
		return axiosClient.delete(url);
	},
};

export default questionApi;

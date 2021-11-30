import axiosClient from './axiosClient';

const answerApi = {
	add(id, values) {
		const url = `/answer/${id}`;
		return axiosClient.post(url, values);
	},
	removeAnswer(questionId, answerId) {
		const url = `/answer/${questionId}/${answerId}`;
		return axiosClient.delete(url);
	},
};

export default answerApi;

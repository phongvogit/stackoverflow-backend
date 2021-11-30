import axiosClient from './axiosClient';

const commentApi = {
	addToAnswer(questionId, answerId, values) {
		const url = `/comment/${questionId}/${answerId}`;
		return axiosClient.post(url, values);
	},
	addToQuestion(questionId, values) {
		const url = `/comment/${questionId}`;
		return axiosClient.post(url, values);
	},
	removeCommentFromAnswer(questionId, answerId, commentId) {
		const url = `/comment/${questionId}/${answerId}/${commentId}`;
		return axiosClient.delete(url);
	},

	removeCommentFromQuestion(questionId, commentId) {
		const url = `/comment/${questionId}/${commentId}`;
		return axiosClient.delete(url);
	},
};

export default commentApi;

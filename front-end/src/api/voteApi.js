import axiosClient from './axiosClient';

const voteApi = {
	upVoteForAnswer(questionId, answerId) {
		const url = `/votes/upvote/${questionId}/${answerId}`;
		return axiosClient.get(url);
	},
	upVoteForQuestion(questionId) {
		const url = `/votes/upvote/${questionId}`;
		return axiosClient.get(url);
	},

	downVoteForAnswer(questionId, answerId) {
		const url = `/votes/downVote/${questionId}/${answerId}`;
		return axiosClient.get(url);
	},
	downVoteForQuestion(questionId) {
		const url = `/votes/downVote/${questionId}`;
		return axiosClient.get(url);
	},

	unVoteForAnswer(questionId, answerId) {
		const url = `/votes/unVote/${questionId}/${answerId}`;
		return axiosClient.get(url);
	},
	unVoteForQuestion(questionId) {
		const url = `/votes/unVote/${questionId}`;
		return axiosClient.get(url);
	},
};

export default voteApi;

import React from 'react';
import { useHistory } from 'react-router';
import voteApi from '../../../../../../api/voteApi';
import { useAppSelector } from '../../../../../../app/hooks';
import Arrow from '../../../../../../components/Common/Arrow/Arrow';
import { selectCurrentUser } from '../../../../../auth/authSlice';
import './QuestionVote.css';

const QuestionVote = ({ score, votes, questionId, answerId, setQuestion }) => {
	const currentUser = useAppSelector(selectCurrentUser);
	const history = useHistory();

	const isUpVoted = () => {
		return votes?.find(v => v.user === currentUser?._id)?.vote === 1;
	};

	const isDownVoted = () => {
		return votes?.find(v => v.user === currentUser?._id)?.vote === -1;
	};

	const upVote = async () => {
		if (answerId) {
			const question = await voteApi.upVoteForAnswer(questionId, answerId);
			setQuestion(question);
		} else if (questionId) {
			const question = await voteApi.upVoteForQuestion(questionId);
			setQuestion(question);
		}
	};

	const downVote = async () => {
		if (answerId) {
			const question = await voteApi.downVoteForAnswer(questionId, answerId);
			setQuestion(question);
		} else if (questionId) {
			const question = await voteApi.downVoteForQuestion(questionId);
			setQuestion(question);
		}
	};

	const unVote = async () => {
		if (answerId) {
			const question = await voteApi.unVoteForAnswer(questionId, answerId);
			setQuestion(question);
		} else if (questionId) {
			const question = await voteApi.unVoteForQuestion(questionId);
			setQuestion(question);
		}
	};

	return (
		<div className='question-vote'>
			<button
				className='question-vote__up'
				title='This answer is useful (click again to undo)'
				onClick={() =>
					currentUser
						? isUpVoted()
							? unVote()
							: upVote()
						: history.push('/login')
				}>
				<Arrow type='up' active={isUpVoted() ? true : false} />
			</button>
			<div className='question-vote__count'>{score}</div>
			<button
				className='question-vote__down'
				title='This answer is not useful (click again to undo)'
				onClick={() =>
					currentUser
						? isDownVoted()
							? unVote()
							: downVote()
						: history.push('/login')
				}>
				<Arrow type='down' active={isDownVoted() ? true : false} />
			</button>
		</div>
	);
};

export default QuestionVote;

import { format } from 'date-fns';
import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import commentApi from '../../../../../../api/commentApi';
import { useAppSelector } from '../../../../../../app/hooks';
import LinkButton from '../../../../../../components/Common/LinkButton/LinkButton';
import { selectCurrentUser } from '../../../../../auth/authSlice';
import './Comment.css';

const Comment = ({ data, answerId, questionId, commentId, setQuestion }) => {
	const { body, author, created } = data;
	const history = useHistory();
	const currentUser = useAppSelector(selectCurrentUser);

	const handleDeleteComment = async () => {
		const res = window.confirm(`Are you sure delete your comment?`);
		if (res) {
			try {
				if (answerId) {
					const data = await commentApi.removeCommentFromAnswer(
						questionId,
						answerId,
						commentId,
					);
					setQuestion(data);
				} else {
					const data = await commentApi.removeCommentFromQuestion(
						questionId,
						commentId,
					);
					setQuestion(data);
				}
				toast.success('Remove comment successfully');
			} catch (error) {
				toast.error('Delete Failed!');
			}
		}
	};
	return (
		<div className='comment'>
			<p>
				{body} {' – '}
				<LinkButton
					handleClick={() => history.push(`/users/${author.username}`)}
					type={'btn--tag mt-1'}
					label={Boolean(author) ? author.username : ''}
				/>{' '}
				<span className='comment__time'>
					{format(new Date(created), "MMM dd'`'yy 'at' k':'mm")}
				</span>
				{(currentUser?.username === author?.username ||
					currentUser?.role === 'admin') && (
					<a href='#' className='delete' onClick={() => handleDeleteComment()}>
						Delete
					</a>
				)}
			</p>
		</div>
	);
};

export default Comment;

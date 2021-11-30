import { formatDistanceToNowStrict } from 'date-fns';

import React from 'react';
import { Link } from 'react-router-dom';

import './ListQuestions.css';

const ListQuestions = ({ number, title, created, _id }) => {
	return (
		<div className='user-detail__profile__questions__post'>
			<div className='user-detail__profile__questions__post__number'>
				<p>{number}</p>
			</div>

			<div className='user-detail__profile__questions__post__title'>
				<Link to={`/question/${_id}`}>
					<p>{title}</p>
				</Link>
			</div>

			<div className='user-detail__profile__questions__post__date'>
				{Boolean(created) &&
					formatDistanceToNowStrict(new Date(created), {
						addSuffix: true,
					})}
			</div>
		</div>
	);
};

export default ListQuestions;

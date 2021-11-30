import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import './CardUser.css';

const CardUser = ({ profilePhoto, username, question_doc, created }) => {
	return (
		<Link className='card-user' to={`/users/${username}`}>
			<div className='card-user-avatar'>
				<img src={profilePhoto} alt='avatar' />
			</div>
			<div className='card-user__info'>
				<p className='card-user__info-name'>{username}</p>
				<p className='card-user__info-question'>
					{question_doc.length} question
				</p>
				<p className='card-user__info-time'>
					{formatDistanceToNowStrict(new Date(created), {
						addSuffix: true,
					})}
				</p>
			</div>
		</Link>
	);
};

export default CardUser;

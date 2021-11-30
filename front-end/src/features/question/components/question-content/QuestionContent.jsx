import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import React from 'react';
import { Link } from 'react-router-dom';
import LinkButton from '../../../../components/Common/LinkButton/LinkButton';
import './QuestionContent.css';

const QuestionContent = ({ question, handleSelectedTag }) => {
	const {
		score,
		title,
		comments,
		tags,
		views,
		answers,
		author_doc,
		created,
		_id,
	} = question;
	console.log('author_doc: ', author_doc);
	return (
		<div className='question-content'>
			<div className='question-content__left'>
				<div className='question-content__left__quantity'>
					<p>{score}</p>
					<span>votes</span>
				</div>
				<div className='question-content__left__quantity border-green'>
					<p>{answers.length}</p>
					<span>answers</span>
				</div>
				<div className='question-content__left__quantity'>
					<p>{comments.length}</p>
					<span>comments</span>
				</div>
				<div className='main-content__info__left__views'>{views} views</div>
			</div>
			<div className='question-content__right'>
				<Link to={`/question/${_id}`}>{title}</Link>
				<p>{title}</p>
				<div className='question-content__right__labels'>
					{tags.map(tag => (
						<LinkButton
							key={tag}
							type={'btn--tag'}
							label={tag}
							handleClick={() => handleSelectedTag(tag)}
						/>
					))}
				</div>
				<div className='question-content__right__author'>
					<div>
						<p>
							asked{' '}
							{formatDistanceToNowStrict(new Date(created), {
								addSuffix: true,
							})}
						</p>
						<Link to={`/users/${author_doc?.[0]?.username}`}>
							<div className='question-content__right__author__avatar'>
								<img src={author_doc?.[0]?.profilePhoto} alt={'avatar'} />
								<span>{author_doc?.[0]?.username}</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionContent;

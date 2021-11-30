import { formatDistanceToNowStrict } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../../../api/userApi';
import SvgSpinner from '../../../components/Common/Spinner/Spinner';
import ListQuestions from './components/ListQuestions';
import './UserDetail.css';

const UserDetail = () => {
	const [user, setUser] = useState({});
	const { username } = useParams();
	useEffect(() => {
		if (!username) return;

		(async () => {
			try {
				const data = await userApi.getUserPrivateInfo(username);
				setUser(data[0]);
			} catch (error) {
				console.log('Failed to fetch user questions', error);
			}
		})();
	}, [username]);

	return (
		<>
			{Object.keys(user).length === 0 ? (
				<div className='loading item-center'>
					<SvgSpinner />
				</div>
			) : (
				<div className='user-detail'>
					<div className='user-detail__title'>Profile</div>
					<div className='user-detail__profile'>
						<div className='user-detail__profile__avatar'>
							<img src={user.posts?.[0].profilePhoto} alt='avatar' />
						</div>
						<div className='user-detail__profile__info'>
							<h3>{user.posts?.[0].username}</h3>
							<p className='user-detail__profile__info__date'>
								user created -{' '}
								{Boolean(user.posts) &&
									formatDistanceToNowStrict(new Date(user.posts?.[0].created), {
										addSuffix: true,
									})}
							</p>
							<div className='user-detail__profile_info__numbers'>
								<div className='user-detail__profile_info__numbers-inner'>
									<p>{user.answers?.[0].answer_doc.length}</p>
									<span>answers</span>
								</div>
								<div className='user-detail__profile_info__numbers-inner'>
									<p>
										{user.comments?.[0].commentInAnswers_doc.length +
											user.comments?.[0].commentInQuestions_doc.length}
									</p>
									<span>comments</span>
								</div>
								<div className='user-detail__profile_info__numbers-inner'>
									<p>{user.posts?.[0].question_doc.length}</p>
									<span>questions</span>
								</div>
								<div className='user-detail__profile_info__numbers-inner'>
									<p>{user.tags?.[0].tags_doc.length}</p>
									<span>tags</span>
								</div>
							</div>
							<div className='user-detail__profile__questions'>
								<h3>List Questions</h3>
								<hr />
								{user.posts?.[0].question_doc.length === 0 ? (
									<p style={{ marginTop: '12px' }}>No questions</p>
								) : (
									user.posts?.[0].question_doc.map(
										({ _id, title, created }, idx) => (
											<ListQuestions
												key={_id}
												_id={_id}
												title={title}
												created={created}
												number={idx + 1}
											/>
										),
									)
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserDetail;

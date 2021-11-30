import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import tagApi from '../../../api/tagApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
	questionActions,
	selectQuestionFilter,
} from '../../../features/question/questionSlice';
import Header from '../../Common/Header/Header';
import RightBanner from '../../Common/RightBanner/RightBanner';
import Routes from '../../Common/Routes';
import Sidebar from '../../Common/Sidebar/Sidebar';
import './Home.css';

const Home = props => {
	const [listPopularTags, setListPopularTags] = useState([]);
	const history = useHistory();
	const dispatch = useAppDispatch();
	const filter = useAppSelector(selectQuestionFilter);

	useEffect(() => {
		(async () => {
			try {
				const listTags = await tagApi.getAll({ _limit: 8 });
				setListPopularTags(listTags.data);
			} catch (error) {
				console.log('Failed to fetch tagList ', error);
			}
		})();
	}, []);

	const handleSelectedTag = async selectedTag => {
		const newFilter = {
			...filter,
			_page: 1,
		};
		await dispatch(questionActions.setFilter(newFilter));
		history.push(`/questions/tags/${selectedTag}`);
	};

	return (
		<div className='home'>
			<div className='home__header'>
				<Header {...props} />
			</div>
			<div className='home__main'>
				<div className='home__main__sidebar'>
					<Sidebar {...props} />
				</div>
				<div className='home__main__content'>
					<Routes />
				</div>
				<div className='home__main__tags'>
					<RightBanner
						tags={listPopularTags}
						setSelectedTag={handleSelectedTag}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;

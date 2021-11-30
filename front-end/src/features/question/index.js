import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import GroupButtons from '../../components/Common/GroupButtons/GroupButtons';
import LinkButton from '../../components/Common/LinkButton/LinkButton';
import PaginationCustom from '../../components/Common/Pagination/Pagination';
import SvgSpinner from '../../components/Common/Spinner/Spinner';
import { checkSortType } from '../../utils/common';
import { selectIsLoggedIn } from '../auth/authSlice';
import QuestionContent from './components/question-content/QuestionContent';
import './Question.css';
import {
	questionActions,
	selectQuestionFilter,
	selectQuestionList,
	selectQuestionLoading,
	selectQuestionPagination,
} from './questionSlice';

const Question = () => {
	const dispatch = useAppDispatch();
	const [questionSortType, setQuestionSortType] = useState('Votes');
	const questionList = useAppSelector(selectQuestionList);
	const pagination = useAppSelector(selectQuestionPagination);
	const filter = useAppSelector(selectQuestionFilter);
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const history = useHistory();
	const isLoading = useAppSelector(selectQuestionLoading);
	const { tag } = useParams();

	useEffect(() => {
		if (tag) {
			dispatch(questionActions.fetchQuestionListByTag({ tag, filter }));
		} else {
			dispatch(questionActions.fetchQuestionList(filter));
		}
	}, [dispatch, filter, tag]);

	const handlePageChange = ({ selected }) => {
		dispatch(
			questionActions.setFilter({
				...filter,
				_page: selected + 1,
			}),
		);
	};

	const handleAddQuestion = () => {
		if (isLoggedIn) {
			history.push('/addQuestion');
		} else {
			history.push('/login', { from: window.location.pathname });
		}
	};

	const handleQuestionSortType = sortType => {
		setQuestionSortType(sortType);
		const sort = checkSortType(sortType);
		dispatch(
			questionActions.setFilter({
				...filter,
				_page: 1,
				_sortType: sort,
			}),
		);
	};

	const handleSelectedTag = async selectedTag => {
		const newFilter = {
			...filter,
			_page: 1,
		};
		await dispatch(questionActions.setFilter(newFilter));
		history.push(`/questions/tags/${selectedTag}`);
	};

	return (
		<div className='question'>
			<div className='question__header'>
				<div className='question__header__title'>
					<h2>All Questions {tag ? `[${tag}]` : ''}</h2>
					<LinkButton
						type={'btn--primary'}
						label={'Ask Question'}
						handleClick={handleAddQuestion}
					/>
				</div>
				<div className='question__header__buttons'>
					<GroupButtons
						labels={['Votes', 'Views', 'Newest', 'Oldest']}
						setSelected={handleQuestionSortType}
						selected={questionSortType}
					/>
				</div>
			</div>

			<hr />
			{isLoading && (
				<div className='loading item-center'>
					<SvgSpinner />
				</div>
			)}
			{questionList.map((question, idx) => (
				<>
					<QuestionContent
						key={idx}
						question={question}
						handleSelectedTag={handleSelectedTag}
					/>
					<hr />
				</>
			))}
			<div className='question__pagination'>
				<PaginationCustom
					pageCount={Math.ceil(pagination._totalRows / pagination._limit)}
					page={pagination._page - 1}
					changePage={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Question;

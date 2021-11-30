import { formatDistanceToNowStrict } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import questionApi from '../../../../api/questionApi';
import GroupButtons from '../../../../components/Common/GroupButtons/GroupButtons';
import SvgSpinner from '../../../../components/Common/Spinner/Spinner';
import AnswerForm from './Components/AnswerForm/AnswerForm';
import Content from './Components/Content/Content';
import './DetailQuestion.css';

const DetailQuestion = () => {
	const [question, setQuestion] = useState({});
	const [answerSortType, setAnswersSortType] = useState('Votes');
	const [isLoading, setIsLoading] = useState(false);

	const { questionId } = useParams();

	useEffect(() => {
		setIsLoading(true);
		if (!questionId) return;
		(async () => {
			try {
				const data = await questionApi.getById(questionId);
				console.log(data, 'data');
				setQuestion(data);

				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		})();
	}, [questionId]);

	const handleSorting = () => {
		switch (answerSortType) {
			case 'Votes':
				return (a, b) => b.score - a.score;
			case 'Newest':
				return (a, b) => new Date(b.created) - new Date(a.created);
			case 'Oldest':
				return (a, b) => new Date(a.created) - new Date(b.created);
			default:
				break;
		}
	};

	return (
		<>
			{Object.keys(question).length === 0 ? (
				<div className='loading item-center'>
					<SvgSpinner />
				</div>
			) : (
				<div className='detail-question'>
					{isLoading && (
						<div className='loading item-center'>
							<SvgSpinner />
						</div>
					)}
					<h2>{question.title}</h2>
					<p>
						Asked{' '}
						{question.created !== undefined &&
							formatDistanceToNowStrict(new Date(question.created), {
								addSuffix: true,
							})}
					</p>
					<hr />
					<Content
						data={question}
						questionId={questionId}
						setQuestion={setQuestion}
					/>
					{/* Answer */}
					<div className='detail-question__answer__header'>
						<h2>Answers</h2>
						<div className='detail-question__answer__header__buttons'>
							<GroupButtons
								labels={['Votes', 'Newest', 'Oldest']}
								setSelected={setAnswersSortType}
							/>
						</div>
					</div>
					{Boolean(question.answers) &&
						question.answers.sort(handleSorting()).map(answer => (
							<div key={answer._id} className='detail-question__answer__list'>
								<Content
									data={answer}
									questionId={questionId}
									answerId={answer._id}
									setQuestion={setQuestion}
								/>
								<hr style={{ marginTop: '80px' }} />
							</div>
						))}

					{/*Add Answer */}
					<h2>Your Answer</h2>
					<AnswerForm id={questionId} setQuestion={setQuestion} />
				</div>
			)}
		</>
	);
};

export default DetailQuestion;

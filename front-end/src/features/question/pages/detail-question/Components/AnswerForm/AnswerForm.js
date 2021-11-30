import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import answerApi from '../../../../../../api/answerApi';
import { useAppSelector } from '../../../../../../app/hooks';
import LinkButton from '../../../../../../components/Common/LinkButton/LinkButton';
import { TextArea } from '../../../../../../components/FormFields/TextArea/TextArea';
import { selectIsLoggedIn } from '../../../../../auth/authSlice';

const schema = yup
	.object({
		text: yup
			.string()
			.required('Text is missing.')
			.min(30, 'Body must be at least 30 characters.')
			.max(30000, 'Body cannot be longer than 30000 characters.'),
	})
	.required();

const AnswerForm = ({ id, setQuestion }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: { text: '' }, resolver: yupResolver(schema) });
	const history = useHistory();

	const isAuthenticated = useAppSelector(selectIsLoggedIn);
	console.log(isAuthenticated);

	const handleFormSubmit = async formValues => {
		try {
			const data = await answerApi.add(id, formValues);
			toast.success('Add answer successfully!');
			setQuestion(data);
			reset({ text: '' });
		} catch (error) {
			console.log(error, 'error');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<TextArea
					placeholder='Write your answer in here.'
					inputProps={register('text')}
					error={Boolean(errors.text) ? errors.text : null}
				/>
				<LinkButton
					type={'btn--primary mt-1'}
					label={'Post your answer'}
					handleClick={() => (!isAuthenticated ? history.push('/login') : null)}
				/>
			</form>
		</div>
	);
};

export default AnswerForm;

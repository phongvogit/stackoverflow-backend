import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LinkButton from '../../../../components/Common/LinkButton/LinkButton';
import FormInput from '../../../../components/FormFields/FormInput/FormInput';
import { InputField } from '../../../../components/FormFields/InputField/InputField';
import { TextArea } from '../../../../components/FormFields/TextArea/TextArea';
import './QuestionForm.css';

const schema = yup
	.object({
		title: yup
			.string()
			.required('Title is missing')
			.max(150, 'Title cannot be longer than 150 characters.')
			.min(15, 'Title must be at least 15 characters.'),
		text: yup
			.string()
			.required('Text is missing')
			.max(1000, 'Text cannot be longer than 150 characters.')
			.min(15, 'Text must be at least 15 characters.'),
		tags: yup
			.array()
			.required('Please enter at least one tag.')
			.max(5, 'Please enter no more than 5 tags.')
			.of(yup.string().max(15, 'Tag cannot be longer than 15 characters. ')),
	})
	.required();

const QuestionForm = ({ initialValues, onSubmit }) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { isSubmitting, errors },
	} = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	});

	const handleFormSubmit = async formValues => {
		try {
			await onSubmit(formValues);
		} catch (error) {
			console.log(error, 'error');
		}
	};

	return (
		<form className='question-form' onSubmit={handleSubmit(handleFormSubmit)}>
			<div className='question-form__input'>
				<InputField
					label='Title'
					inputInfo="Be specific and imagine you're asking a question to another person"
					inputProps={register('title')}
					placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
					error={Boolean(errors.title) ? errors.title : null}
				/>
			</div>
			<div className='question-form__input'>
				<TextArea
					label='Body'
					inputInfo='Include all the information someone would need to answer your question'
					inputProps={register('text')}
					placeholder='Enter body with minimum 30 characters'
					error={Boolean(errors.text) ? errors.text : null}
				/>
			</div>
			<div className='question-form__input'>
				<FormInput
					label='Tags'
					name='tags'
					type='text'
					value={watch('tags')}
					inputInfo="Be specific and imagine you're asking a question to another person"
					onChange={e => {
						console.log(e);
						setValue(
							'tags',
							e.map(e => e.toLowerCase()),
							true,
						);
					}}
					error={Boolean(errors.tags) ? errors.tags : null}
				/>
			</div>
			<div className='question-form__btn'>
				<LinkButton
					type={'btn--primary'}
					label={'Post your question'}
					isLoading={isSubmitting}
				/>
			</div>
		</form>
	);
};

export default QuestionForm;

import React from 'react';
import TagsInput from 'react-tagsinput';
import './FormInput.css';

const FormInput = ({ label, inputInfo, error, ...props }) => {
	return (
		<div className='tags-input'>
			<label className='tags-input__label'>{label}</label>
			{inputInfo && <p className='tags-input__info'>{inputInfo}</p>}
			<div className='tags-input__container'>
				<TagsInput onlyUnique {...props} />
			</div>
			{error && <p className='tags-input__errors'>* {error.message}</p>}
		</div>
	);
};

export default FormInput;

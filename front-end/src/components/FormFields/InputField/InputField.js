import React from 'react';
import './InputField.css';

export function InputField({
	type,
	label,
	inputInfo,
	placeholder,
	icon,
	error,
	onChange,
	inputProps,
}) {
	return (
		<div className='input-field'>
			{label && <h4 className='input-field__label'>{label}</h4>}
			{inputInfo && <p className='input-field__info'>{inputInfo}</p>}
			<div className='input-field__txt'>
				{icon && <i className={`bx bx-${icon} input-field__txt__icon`}></i>}
				<input
					type={type}
					className={`input-field__txt__inner ${
						icon && 'input-field__txt__inner-space-icon'
					}`}
					placeholder={placeholder}
					onChange={onChange}
					{...inputProps}
				/>
			</div>
			{error && <p className='input-field__errors'>* {error.message}</p>}
		</div>
	);
}

import React from 'react';
import './TextArea.css';

export function TextArea({ label, inputInfo, placeholder, error, inputProps }) {
	return (
		<div className='text-area'>
			<h4 className='text-area__label'>{label}</h4>
			<p className='text-area__info'>{inputInfo}</p>
			<textarea
				className='text-area__txt'
				rows='10'
				placeholder={placeholder}
				{...inputProps}></textarea>

			{error && <p className='text-area__errors'>* {error.message}</p>}
		</div>
	);
}

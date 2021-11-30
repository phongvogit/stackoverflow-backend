import React from 'react';
import './InputCustom.css';

const InputCustom = ({ placeholder, icon }) => {
	return (
		<>
			<div className='input'>
				{icon && <i className={`bx bx-${icon} input__icon`}></i>}
				<input
					className={`input__field ${icon && 'input__field-space-icon'}`}
					type='text'
					placeholder={placeholder}
				/>
			</div>
		</>
	);
};

export default InputCustom;

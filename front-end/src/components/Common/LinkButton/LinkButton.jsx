import React from 'react';
import './linkButton.css';

const LinkButton = ({
	label,
	type,
	href,
	handleClick,
	isLoading = false,
	...props
}) => {
	return (
		<>
			<button
				{...props}
				className={`btn ${type} ${isLoading ? 'isLoading' : ''}`}
				onClick={handleClick}>
				{label}
			</button>
		</>
	);
};

export default LinkButton;

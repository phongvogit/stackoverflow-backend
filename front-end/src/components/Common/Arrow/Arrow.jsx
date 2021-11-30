import React from 'react';

const Arrow = ({ type, active }) => {
	return (
		<>
			{type === 'up' ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='36'
					height='36'
					fill='none'
					viewBox='0 0 36 36'>
					<path
						fill={active ? '#F48024' : '#697075'}
						d='M2 26H34L18 10L2 26Z'
					/>
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='36'
					height='36'
					fill='none'
					viewBox='0 0 36 36'>
					<path
						fill={active ? '#F48024' : '#697075'}
						d='M2 10H34L18 26L2 10Z'
					/>
				</svg>
			)}
		</>
	);
};

export default Arrow;

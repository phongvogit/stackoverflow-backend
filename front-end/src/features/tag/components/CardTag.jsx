import React from 'react';
import LinkButton from '../../../components/Common/LinkButton/LinkButton';
import './CardTag.css';

const CardTag = ({ label, count }) => {
	return (
		<div className='card-tag'>
			<div>
				<LinkButton type={'btn--tag'} label={label} />
			</div>

			<span>{count} questions</span>
		</div>
	);
};

export default CardTag;

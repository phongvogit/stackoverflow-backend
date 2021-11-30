import React from 'react';
import LinkButton from '../LinkButton/LinkButton';
import './rightBanner.css';

const RightBanner = ({ tags, setSelectedTag }) => {
	return (
		<>
			<div className='tags-title'>Popular Tags</div>
			<div className='tags-items'>
				{tags.map((tag, idx) => (
					<div className='tags-item'>
						<LinkButton
							key={idx}
							type={'btn--tag'}
							label={tag._id}
							handleClick={() => setSelectedTag(tag._id)}
						/>
						<span>x {tag.count}</span>
					</div>
				))}
			</div>
		</>
	);
};

export default RightBanner;

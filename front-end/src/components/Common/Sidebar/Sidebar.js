import React from 'react';
import { Link } from 'react-router-dom';
import sidebar_items from '../../../assets/JsonData/sidebar_routes.json';
import './sidebar.css';

const SidebarItem = props => {
	const active = props.active ? 'active' : '';
	return (
		<div>
			<div className={`sidebar__item ${active}`}>
				<i className={props.icon}></i>
				<span>{props.title}</span>
			</div>
		</div>
	);
};

const Sidebar = ({ location = '/', activeItem = -1 }) => {
	activeItem = sidebar_items.findIndex(
		item => item.route === location.pathname,
	);

	return (
		<div className='sidebar'>
			{sidebar_items.map((item, index) => (
				<Link to={item.route} key={index}>
					<SidebarItem
						key={item.route}
						title={item.display_name}
						icon={item.icon}
						active={index === activeItem}
					/>
				</Link>
			))}
		</div>
	);
};

export default Sidebar;

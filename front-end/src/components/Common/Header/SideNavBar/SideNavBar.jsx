import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../../../../assets/images/Hamburger.svg';
import { ReactComponent as Logo } from '../../../../assets/images/LogoMd.svg';
import sidebar_items from '../../../../assets/JsonData/sidebar_routes.json';
import './SideNavBar.css';

const SidebarUI = ({ isOpen, ...rest }) => {
	const classes = ['side-nav-bar', isOpen ? 'is-open' : ''];

	return <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />;
};

SidebarUI.Content = ({ isOpen, ...rest }) => {
	const classes = ['side-nav-bar__content', isOpen ? 'is-open' : ''];

	return <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />;
};

SidebarUI.OverLay = ({ isOpen, ...rest }) => {
	const classes = ['side-nav-bar-overlay', isOpen ? 'is-open' : ''];

	return <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />;
};

const SidebarItem = props => {
	const active = props.active ? 'active' : '';
	return (
		<div>
			<div className={`side-nav-bar__content__tabs__item ${active}`}>
				<i className={props.icon}></i>
				<span>{props.title}</span>
			</div>
		</div>
	);
};

const SideNavBar = ({ location = '/' }) => {
	const [isOpen, setIsOpen] = useState(false);

	const activeItem = sidebar_items.findIndex(
		item => item.route === location.pathname,
	);

	const openSideBar = (isOp = true) => {
		setIsOpen(isOp);
	};

	return (
		<>
			<SidebarUI isOpen={isOpen}>
				<Hamburger onClick={openSideBar} />
				<SidebarUI.Content isOpen={isOpen} onClick={() => openSideBar(false)}>
					<div className='side-nav-bar__logo'>
						<Link to='/'>
							<Logo width='170px' height='60' />
						</Link>
					</div>
					<div className='side-nav-bar__content__tabs'>
						{sidebar_items.map((item, index) => (
							<Link to={item.route} key={item.route}>
								<SidebarItem
									title={item.display_name}
									icon={item.icon}
									active={index === activeItem}
								/>
							</Link>
						))}
					</div>
				</SidebarUI.Content>
			</SidebarUI>
			<SidebarUI.OverLay isOpen={isOpen} onClick={() => openSideBar(false)} />
		</>
	);
};

export default SideNavBar;

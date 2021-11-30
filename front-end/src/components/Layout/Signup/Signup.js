import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../../app/hooks';
import {
	selectFetchFailed,
	selectIsLoggedIn,
} from '../../../features/auth/authSlice';
import AuthForm from '../../Common/AuthForm/AuthForm';
import Header from '../../Common/Header/Header';
import Caption from './components/Caption/Caption';
import './Signup.css';

const initialState = {
	username: '',
	password: '',
	passwordConfirmation: '',
};

const Signup = () => {
	const history = useHistory();
	const error = useAppSelector(selectFetchFailed);
	const isLoggedIn = useAppSelector(selectIsLoggedIn);

	const { from } = Boolean(history.location.state)
		? history.location.state
		: '/';

	useEffect(() => {
		if (isLoggedIn) {
			history.push(from);
		}
	}, [isLoggedIn, from, history]);

	return (
		<div className='signup'>
			<div className='signup__header'>
				<Header />
			</div>
			<div className='signup__content'>
				<div className='signup__caption'>
					<Caption />
				</div>
				<p className='delete'></p>
				<div className='signup__form'>
					<AuthForm
						action='Sign up'
						initialState={initialState}
						error={error}
					/>
				</div>
			</div>
			<div className='signup__footer'></div>
		</div>
	);
};

export default Signup;

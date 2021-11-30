import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ReactComponent as Logo } from '../../../assets/images/LogoGlyphMd.svg';
import { authActions, selectIsLogging } from '../../../features/auth/authSlice';
import { InputField } from '../../FormFields/InputField/InputField';
import LinkButton from '../LinkButton/LinkButton';
import './AuthForm.css';

const schema = yup.object({
	username: yup
		.string()
		.required('Required')
		.max(16, 'Must be at most 16 characters long')
		.matches(/^[a-zA-Z0-9_-]+$/, 'Contains invalid characters'),
	password: yup
		.string()
		.required('Required')
		.min(6, 'Must be at least 6 characters long')
		.max(50, 'Must be at most 50 characters long'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const signUpLink = (
	<>
		Already have an account?{' '}
		<Link to='/login' name='login' className='link ml-1'>
			Log in
		</Link>
	</>
);

const logInLink = (
	<>
		Don't have an account?{' '}
		<Link to='/signup' name='register' className='link ml-1'>
			Sign up
		</Link>
	</>
);

const AuthForm = ({ action = 'Login', initialState, error }) => {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm({ defaultValues: initialState, resolver: yupResolver(schema) });
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsLogging);

	useEffect(() => {
		// reset Error message
		dispatch(authActions.fetchFailed(''));
	}, [dispatch]);

	const onSubmit = async formValues => {
		if (action === 'Login') {
			dispatch(authActions.login(formValues));
		} else if (action === 'Sign up') {
			dispatch(authActions.signup(formValues));
		}
	};

	return (
		<div className='auth-form'>
			<Logo className='auth-form__logo' />
			<div className='auth-form__login'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='auth-form__login__input'>
						<InputField
							label='Username'
							inputProps={register('username')}
							error={Boolean(errors.username) ? errors.username : null}
						/>
					</div>
					<div className='auth-form__login__input'>
						<InputField
							type='password'
							label='Password'
							inputProps={register('password')}
							error={Boolean(errors.password) ? errors.password : null}
						/>
					</div>
					{action === 'Login' ? null : (
						<div className='auth-form__login__input'>
							<InputField
								type='password'
								label='Confirm password'
								inputProps={register('passwordConfirmation')}
								error={
									Boolean(errors.passwordConfirmation)
										? errors.passwordConfirmation
										: null
								}
							/>
						</div>
					)}
					{error && <p className='delete'>* {error}</p>}
					<LinkButton
						disabled={isSubmitting}
						isLoading={isLoading}
						type={'btn--primary'}
						label={action === 'Sign up' ? 'Sign up' : 'Login'}
						style={{ width: '100%', height: '100%' }}
					/>
				</form>

				<div className='auth-form__login__info'>
					By clicking “{action}”, you agree to our{' '}
					<a
						href='https://stackoverflow.com/legal/terms-of-service/public'
						className='link'>
						terms of service
					</a>
					,{' '}
					<a
						href='https://stackoverflow.com/legal/privacy-policy'
						name='privacy'
						className='link'>
						privacy policy
					</a>{' '}
					and{' '}
					<a
						href='https://stackoverflow.com/legal/cookie-policy'
						className='link'>
						cookie policy
					</a>
				</div>
			</div>
			<div className='auth-form__redirect'>
				{action === 'Sign up' ? signUpLink : logInLink}
			</div>
		</div>
	);
};

export default AuthForm;

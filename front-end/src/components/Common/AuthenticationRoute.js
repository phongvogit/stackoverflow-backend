import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { isAuthenticated } from '../../utils/auth';

export function AuthorizationRoute(props) {
	// Check if use is logged in
	// If yes, move to homepage
	// Otherwise, redirect to login page
	const isLoggedIn = isAuthenticated();
	if (isLoggedIn) return <Redirect to='/' />;

	return <Route {...props} />;
}

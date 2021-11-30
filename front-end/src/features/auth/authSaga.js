import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import authApi from '../../api/authApi';
import { isAuthenticated } from '../../utils/auth';
import { authActions } from './authSlice';

function* handleLogin(action) {
	try {
		yield delay(1000);
		const response = yield call(authApi.login, action.payload);
		localStorage.setItem('token', response.token);
		localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
		localStorage.setItem('expiresAt', response.expiresAt);
		yield put(authActions.loginSuccess(response.userInfo));
	} catch (error) {
		yield put(authActions.fetchFailed(error.response.data.message));
	}
}

function* handleSignup(action) {
	try {
		yield delay(1000);
		const response = yield call(authApi.signup, action.payload);
		localStorage.setItem('token', response.token);
		localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
		localStorage.setItem('expiresAt', response.expiresAt);
		yield put(authActions.loginSuccess(response.userInfo));
	} catch (error) {
		yield put(authActions.fetchFailed(error.response.data.message));
	}
}

function* handleLogout() {
	localStorage.removeItem('token');
	localStorage.removeItem('expiresAt');
	localStorage.removeItem('userInfo');
}

function* watchLoginFlow() {
	while (true) {
		const isLoggedIn = isAuthenticated();
		if (!isLoggedIn) {
			const action = yield take([
				authActions.login.type,
				authActions.signup.type,
			]);
			if (action.type === 'auth/login') {
				yield fork(handleLogin, action);
			} else if (action.type === 'auth/signup') {
				yield fork(handleSignup, action);
			}
		} else {
			const userInfo = JSON.parse(localStorage.getItem('userInfo'));
			yield put(authActions.loginSuccess(userInfo));
		}

		const action = yield take([
			authActions.logout.type,
			authActions.fetchFailed.type,
		]);

		if (action.type !== 'auth/fetchFailed') {
			yield call(handleLogout);
		}
	}
}

export function* authSaga() {
	//reset Error message when moving another page
	yield fork(watchLoginFlow);
}

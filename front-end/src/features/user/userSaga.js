import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import userApi from '../../api/userApi';
import { userActions } from './userSlice';

function* fetchUserList(action) {
	try {
		const response = yield call(userApi.getAll, action.payload);
		yield put(userActions.fetchUserListSuccess(response));
	} catch (error) {
		console.log('Failed to fetch user list', error);
		yield put(userActions.fetchUserListFailed());
	}
}

function* handleSearchDebounce(action) {
	try {
		const response = yield call(userApi.getUserByName, action.payload);
		yield put(userActions.fetchUserListSuccess(response));
	} catch (error) {
		console.log('Failed to fetch user list', error);
		yield put(userActions.fetchUserListFailed());
	}
}

export default function* userSaga() {
	yield takeLatest(userActions.fetchUserList.type, fetchUserList);
	yield debounce(
		500,
		userActions.setFilterWithDebounce.type,
		handleSearchDebounce,
	);
}

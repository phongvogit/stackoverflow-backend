import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import questionSaga from '../features/question/questionSaga';
import tagSaga from '../features/tag/tagSaga';
import userSaga from '../features/user/userSaga';

export default function* rootSaga() {
	yield all([questionSaga(), authSaga(), tagSaga(), userSaga()]);
}

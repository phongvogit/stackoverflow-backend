import { call, put, takeLatest } from '@redux-saga/core/effects';
import questionApi from '../../api/questionApi';
import { questionActions } from './questionSlice';

function* fetchQuestionList(action) {
	try {
		const response = yield call(questionApi.getAll, action.payload);
		yield put(questionActions.fetchQuestionListSuccess(response));
	} catch (error) {
		console.log('Failed to fetch question list', error);
		yield put(questionActions.fetchQuestionListFailed());
	}
}

function* fetchQuestionListByTag(action) {
	try {
		const response = yield call(questionApi.getAllByTags, action.payload);
		yield put(questionActions.fetchQuestionListSuccess(response));
	} catch (error) {
		console.log('Failed to fetch question list', error);
		yield put(questionActions.fetchQuestionListFailed());
	}
}

export default function* questionSaga() {
	yield takeLatest(questionActions.fetchQuestionList.type, fetchQuestionList);
	yield takeLatest(
		questionActions.fetchQuestionListByTag.type,
		fetchQuestionListByTag,
	);
}

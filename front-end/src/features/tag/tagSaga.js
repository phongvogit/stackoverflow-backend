import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import tagApi from '../../api/tagApi';
import { tagActions } from './tagSlice';

function* fetchTagList(action) {
	try {
		const response = yield call(tagApi.getAll, action.payload);
		yield put(tagActions.fetchTagListSuccess(response));
	} catch (error) {
		console.log('Failed to fetch tag list', error);
		yield put(tagActions.fetchTagListFailed());
	}
}

function* handleSearchDebounce(action) {
	try {
		const response = yield call(tagApi.getTagsByName, action.payload);
		yield put(tagActions.fetchTagListSuccess(response));
	} catch (error) {
		console.log('Failed to fetch Tag list', error);
		yield put(tagActions.fetchTagListFailed());
	}
}

export default function* tagSaga() {
	yield takeLatest(tagActions.fetchTagList.type, fetchTagList);
	yield debounce(
		500,
		tagActions.setFilterWithDebounce.type,
		handleSearchDebounce,
	);
}

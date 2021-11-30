import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	list: [],
	filter: {
		_page: 1,
		_limit: 8,
	},
	pagination: {
		_page: 1,
		_limit: 8,
		_totalRows: 6,
	},
};

const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		fetchQuestionList(state, action) {
			state.loading = true;
		},
		fetchQuestionListByTag(state, action) {
			state.loading = true;
		},
		fetchQuestionListSuccess(state, action) {
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
			state.loading = false;
		},
		fetchQuestionListFailed(state) {
			state.loading = false;
		},

		setFilter(state, action) {
			state.filter = action.payload;
		},

		setFilterWithDebounce(state, action) {},
	},
});

//Actions
export const questionActions = questionSlice.actions;
//Selectors
export const selectQuestionLoading = state => state.question.loading;
export const selectQuestionList = state => state.question.list;
export const selectQuestionPagination = state => state.question.pagination;
export const selectQuestionFilter = state => state.question.filter;

//Reducers
const questionReducer = questionSlice.reducer;
export default questionReducer;

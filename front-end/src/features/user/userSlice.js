import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	list: [],
	filter: {
		_page: 1,
		_limit: 24,
	},
	pagination: {
		_page: 1,
		_limit: 24,
		_totalRows: 6,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		fetchUserList(state, action) {
			state.loading = true;
		},
		fetchUserListSuccess(state, action) {
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
			state.loading = false;
		},
		fetchUserListFailed(state) {
			state.loading = false;
		},

		setFilter(state, action) {
			state.filter = action.payload;
		},

		setFilterWithDebounce(state, action) {
			state.loading = true;
		},
	},
});

//Actions
export const userActions = userSlice.actions;
//Selectors
export const selectUserLoading = state => state.user.loading;
export const selectUserList = state => state.user.list;
export const selectUserPagination = state => state.user.pagination;
export const selectUserFilter = state => state.user.filter;

//Reducers
const userReducer = userSlice.reducer;
export default userReducer;

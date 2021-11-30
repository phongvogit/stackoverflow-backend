import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: false,
	logging: false,
	currentUser: undefined,
	messageError: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.logging = true;
		},
		signup(state, action) {
			state.logging = true;
		},
		loginSuccess(state, action) {
			state.isLoggedIn = true;
			state.logging = false;
			state.currentUser = action.payload;
		},
		fetchFailed(state, action) {
			state.logging = false;
			state.messageError = action.payload;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.currentUser = undefined;
		},
	},
});

//Actions
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsLogging = state => state.auth.logging;
export const selectCurrentUser = state => state.auth.currentUser;
export const selectFetchFailed = state => state.auth.messageError;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;

import { createSlice } from '@reduxjs/toolkit';

export const utilitySlice = createSlice({
	name: 'utilitySlice',
	initialState: {
		loginScreen: false,
		deleteScreenPopup: false,
		darkMode: false,
		showError: false,
		showDeleteOption: false,
		errorMessage: null,
	},
	reducers: {
		displayPopup: (state, action) => {
			state.loginScreen = action.payload;
		},
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
		showError: (state, action) => {
			state.showError = action.payload;
		},
		setErrorDetails: (state, action) => {
			state.errorMessage = action.payload;
		},
		displayDeleteScreenPopup: (state, action) => {
			state.deleteScreenPopup = action.payload;
		},
		displayDeleteAccountButton: (state, action) => {
			state.showDeleteOption = action.payload;
		},
	},
});

export default utilitySlice;
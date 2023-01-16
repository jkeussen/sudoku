import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
	showMenu: boolean;
	showDarkTheme: boolean,
	showOptionsSwitches: boolean,
	highlightActiveRowsAndCols: boolean;
	highlightActiveSection: boolean;
	highlightSameValues: boolean;
	highlightValidRowsAndCols: boolean;
	highlightValidSections: boolean;
	showDifficultySelect: boolean,
	showLocalErrors: boolean;
	showGlobalErrors: boolean;
	noteModeEnabled: boolean;
	isTimerPaused: boolean;
	isTimerDisabled: boolean;
	timerSecondsElapsed: number;
}

const initialUiState: UiState = {
	showMenu: false,
	showDarkTheme: false,
	showOptionsSwitches: false,
	highlightActiveRowsAndCols: true,
	highlightActiveSection: true,
	highlightSameValues: true,
	highlightValidRowsAndCols: false,
	highlightValidSections: true,
	showDifficultySelect: false,
	showLocalErrors: false,
	showGlobalErrors: true,
	noteModeEnabled: false,
	isTimerPaused: false,
	isTimerDisabled: false,
	timerSecondsElapsed: 0,
};

const uiSlice = createSlice({
	name: "ui",
	initialState: initialUiState,
	reducers: {
		setShowMenu(state, action: { payload: boolean }) {
			state.showMenu = action.payload;
		},
		setShowDarkTheme(state, action: { payload: boolean }) {
			state.showDarkTheme = action.payload;
		},
		setShowOptionsSwitches(state, action: { payload: boolean }) {
			state.showOptionsSwitches = action.payload;
		},
		setHighlightActiveRowsAndCols(state, action: { payload: boolean }) {
			state.highlightActiveRowsAndCols = action.payload;
		},
		setHighlightActiveSection(state, action: { payload: boolean }) {
			state.highlightActiveSection = action.payload;
		},
		setHighlightSameValues(state, action: { payload: boolean }) {
			state.highlightSameValues = action.payload;
		},
		setHighlightValidRowsAndCols(state, action: { payload: boolean }) {
			state.highlightValidRowsAndCols = action.payload;
		},
		setHighlightValidSections(state, action: { payload: boolean }) {
			state.highlightValidSections = action.payload;
		},
		setShowDifficultySelect(state, action: { payload: boolean }) {
			state.showDifficultySelect = action.payload;
		},
		setShowLocalErrors(state, action: { payload: boolean }) {
			state.showLocalErrors = action.payload;
		},
		setShowGlobalErrors(state, action: { payload: boolean }) {
			state.showGlobalErrors = action.payload;
		},
		setnoteModeEnabled(state, action: { payload: boolean }) {
			state.noteModeEnabled = action.payload;
		},
		setIsTimerPaused(state, action: { payload: boolean }) {
			state.isTimerPaused = action.payload;
		},
		setIsTimerDisabled(state, action: { payload: boolean }) {
			state.isTimerDisabled = action.payload;
		},
		incrementTimer(state, action: { payload: number }) {
			let increment = action.payload
			state.timerSecondsElapsed += increment;
		},
		setTimerSecondsElapsed(state, action: { payload: number }) {
			state.timerSecondsElapsed = action.payload;
		},
		collapseMenuItems(state) {
			state.showOptionsSwitches = false;
			state.showDifficultySelect = false;
		},
		saveUi(state) {
			localStorage.setItem('uiState', JSON.stringify(state))
		},
		loadUi(state, action) {
			// state = { ...action.payload }
			// state = action.payload
			return { ...action.payload }
		}
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;

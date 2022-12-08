import { createSlice } from "@reduxjs/toolkit";

interface UiState {
	showMenu: boolean;
	highlightActiveRowsAndCols: boolean;
	highlightActiveSection: boolean;
	highlightSameValues: boolean;
	highlightValidRowsAndCols: boolean;
	highlightValidSections: boolean;
	showLocalErrors: boolean;
	showGlobalErrors: boolean;
	isTimerPaused: boolean;
	isTimerDisabled: boolean;
	timerSecondsElapsed: number;
}

const initialUiState: UiState = {
	showMenu: false,
	highlightActiveRowsAndCols: true,
	highlightActiveSection: true,
	highlightSameValues: true,
	highlightValidRowsAndCols: true,
	highlightValidSections: true,
	showLocalErrors: false,
	showGlobalErrors: true,
	isTimerPaused: false,
	isTimerDisabled: false,
	timerSecondsElapsed: 0,
};

const uiSlice = createSlice({
	name: "ui",
	initialState: initialUiState,
	reducers: {
		toggleShowMenu(state) {
			state.showMenu = !state.showMenu
		},
		toggleHighlightActiveRowsAndCols(state) {
			state.highlightActiveRowsAndCols = !state.highlightActiveRowsAndCols
		},
		toggleHighlightActiveSection(state) {
			state.highlightActiveSection = !state.highlightActiveSection
		},
		toggleHighlightSameValues(state) {
			state.highlightSameValues = !state.highlightSameValues
		},
		toggleHighlightValidRowsAndCols(state) {
			state.highlightValidRowsAndCols = !state.highlightValidRowsAndCols
		},
		toggleHighlightValidSections(state) {
			state.highlightValidSections = !state.highlightValidSections
		},
		toggleShowLocalErrors(state) {
			state.showLocalErrors = !state.showLocalErrors
		},
		toggleShowGlobalErrors(state) {
			state.showGlobalErrors = !state.showGlobalErrors
		},
		toggleIsTimerPaused(state) {
			state.isTimerPaused = !state.isTimerPaused
		},
		toggleIsTimerDisabled(state) {
			state.isTimerDisabled = !state.isTimerDisabled
		},
		// toggleBoolean(state, action: { payload: string }) {
		// 	let key = action.payload as keyof UiState;
		// 	if (typeof state[key] !== 'boolean') {
		// 		console.error(`Key: ${key} in state.uiSlice does not reference a boolean value and cannot be toggled.`)
		// 		return;
		// 	};
		// 	state[key] = !state[key];
		// },
		incrementTimer(state, action: { payload: number }) {
			let increment = action.payload
			state.timerSecondsElapsed += increment;
		}
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;

import { createSlice } from '@reduxjs/toolkit'

interface UiState {
	showMenu: boolean,
	highlightActiveRowsAndCols: boolean,
	highlightActiveSection: boolean,
	highlightSameValues: boolean,
	highlightValidRowsAndCols: boolean,
	highlightValidSections: boolean,
	showLocalErrors: boolean,
	showGlobalErrors: boolean,
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
}

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialUiState,
	reducers: {
		toggleBool(state, action: { payload:string }) {
			state[action.payload as keyof UiState] = !state[action.payload as keyof UiState];
		}
	}
})

export const uiActions = uiSlice.actions;
export default uiSlice;
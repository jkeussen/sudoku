import { createSlice } from "@reduxjs/toolkit";
import { getValidRows, getValidCols, getValidSections } from '../helpers/get-valid-areas';
import { getLocalErrors, getGlobalErrors } from '../helpers/get-errors'

interface PuzzleState {
	initialString: string;
	solvedString: string;
	initialGrid: string[][];
	solvedGrid: string[][];
	userGrid: string[][];
	activeSquare: number | null;
	validRows: number[];
	validCols: number[];
	validSections: number[];
	localErrors: number[];
	globalErrors: number[];
}

const initialState: PuzzleState = {
	initialString: "",
	solvedString: "",
	initialGrid: [],
	solvedGrid: [],
	userGrid: [],
	activeSquare: null,
	validRows: [],
	validCols: [],
	validSections: [],
	localErrors: [],
	globalErrors: [],
};

const puzzleSlice = createSlice({
	name: "puzzle",
	initialState: initialState,
	reducers: {
		setLocalErrors(state, action: { payload: number[] }) {
			state.localErrors = action.payload;
		},
		setGlobalErrors(state, action: { payload: number[] }) {
			state.globalErrors = action.payload;
		},
		updateUserPuzzle(
			state,
			action: { payload: { val: string; row: number; col: number; activeSquare: number } }
		) {
			let newUserPuzzle = [...state.userGrid]
    	newUserPuzzle[action.payload.row][action.payload.col] = action.payload.val
			state.localErrors = getLocalErrors(newUserPuzzle, action.payload.activeSquare);
			state.globalErrors = getGlobalErrors(newUserPuzzle);
			state.validRows = getValidRows(newUserPuzzle)
			state.validCols = getValidCols(newUserPuzzle)
			state.validSections = getValidSections(newUserPuzzle)
		},
		setActiveSquare(state, action: { payload: number }) {
			state.activeSquare = action.payload
		}
	},
});

export const puzzleActions = puzzleSlice.actions;
export default puzzleSlice;

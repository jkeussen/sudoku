import { createSlice } from "@reduxjs/toolkit";

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
	// localErrors: Set<number>;
	// globalErrors: Set<number>;
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
	// localErrors: new Set(),
	// globalErrors: new Set(),
	localErrors: [],
	globalErrors: [],
};

const puzzleSlice = createSlice({
	name: "puzzle",
	initialState: initialState,
	reducers: {
		setLocalErrors(state, action: { payload: number[] }) {
			const uniqueNums = new Set(action.payload)
			state.localErrors = Array.from(uniqueNums);
		},
		setGlobalErrors(state, action: { payload: number[] }) {
			const uniqueNums = new Set(action.payload)
			state.globalErrors = Array.from(uniqueNums);
		},
	},
});

export const puzzleActions = puzzleSlice.actions;
export default puzzleSlice;

import { createSlice } from "@reduxjs/toolkit";
import {
	generateSudoku,
	PuzzleDifficultyString,
} from "../lib/generate-unique-puzzle";
import {
	getValidRows,
	getValidCols,
	getValidSections,
} from "../helpers/get-valid-areas";
import { getLocalErrors, getGlobalErrors } from "../helpers/get-errors";
import { buildPuzzleGridFromString, getSameValueTiles } from "../helpers/utils";
import { empty } from "../helpers/valid-inputs";

interface PuzzleState {
	initialString: string;
	solvedString: string;
	initialGrid: string[][];
	solvedGrid: string[][];
	userGrid: string[][];
	activeSquare: number;
	validRows: number[];
	validCols: number[];
	validSections: number[];
	localErrors: number[];
	globalErrors: number[];
	sameValueTiles: number[];
	isPuzzleSolved: boolean;
}

const initialState: PuzzleState = {
	initialString: "",
	solvedString: "",
	initialGrid: [],
	solvedGrid: [],
	userGrid: [],
	activeSquare: 0,
	validRows: [],
	validCols: [],
	validSections: [],
	localErrors: [],
	globalErrors: [],
	sameValueTiles: [],
	isPuzzleSolved: false,
};

const puzzleSlice = createSlice({
	name: "puzzle",
	initialState: initialState,
	reducers: {
		generatePuzzle(state, action: { payload: PuzzleDifficultyString }) {
			const [puzzle, solution] = generateSudoku(action.payload);
			const puzzleGrid = buildPuzzleGridFromString(puzzle);
			const solutionGrid = buildPuzzleGridFromString(solution);
			state.initialString = puzzle;
			state.solvedString = solution;
			state.initialGrid = puzzleGrid
			state.solvedGrid = solutionGrid
			state.userGrid = [...puzzleGrid];
			state.localErrors = [];
			state.globalErrors = [];
			state.validRows = [];
			state.validCols = [];
			state.validSections = [];
			// state.sameValueTiles = [];
			state.sameValueTiles = getSameValueTiles(puzzleGrid, 0)
			state.isPuzzleSolved = false;
		},
		solvePuzzle(state, action: {payload?: any} ) {
			let newUserGrid = [...state.solvedGrid]; 
			state.userGrid = newUserGrid
			state.localErrors = []
			state.globalErrors = []
			state.validRows = getValidRows(newUserGrid);
			state.validCols = getValidCols(newUserGrid);
			state.validSections = getValidSections(newUserGrid);
			state.sameValueTiles = [];
			console.log(state.validRows, '\n', state.validCols, '\n', state.validSections)
			state.isPuzzleSolved = true;
		},
		setLocalErrors(state, action: { payload: number[] }) {
			state.localErrors = action.payload;
		},
		setGlobalErrors(state, action: { payload: number[] }) {
			state.globalErrors = action.payload;
		},
		updateUserPuzzle(
			state,
			action: {
				payload: {
					val: string;
					activeSquare: number;
				};
			}
		) {
			if (state.initialString[action.payload.activeSquare] !== empty) return
			let newUserPuzzle = [...state.userGrid];
			let row = Math.floor(action.payload.activeSquare / 9)
			let col = action.payload.activeSquare % 9
			newUserPuzzle[row][col] = action.payload.val;
			state.localErrors = getLocalErrors(
				newUserPuzzle,
				action.payload.activeSquare
			);
			state.globalErrors = getGlobalErrors(newUserPuzzle);
			state.validRows = getValidRows(newUserPuzzle);
			state.validCols = getValidCols(newUserPuzzle);
			state.validSections = getValidSections(newUserPuzzle);
			state.sameValueTiles = getSameValueTiles(newUserPuzzle, action.payload.activeSquare)
			if (state.validSections.length === 9) { 
				state.isPuzzleSolved = true;
			} else {
				state.isPuzzleSolved = false;
			}
		},
		setActiveSquare(state, action: { payload: number }) {
			state.activeSquare = action.payload;
			state.localErrors = getLocalErrors(
				state.userGrid,
				action.payload
			);
			state.sameValueTiles = getSameValueTiles(state.userGrid, action.payload)
		},
	},
});

export const puzzleActions = puzzleSlice.actions;
export default puzzleSlice;

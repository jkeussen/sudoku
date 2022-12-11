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
import { buildPuzzleGridFromString, generateClearNoteDataForEntirePuzzle, generateClearNoteDataForSingleSquare, getSameValueTiles } from "../helpers/utils";
import { empty } from "../helpers/valid-inputs";
import { CandidateTileValues } from "../components/Notes";

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
	candidates: CandidateTileValues[];
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
	candidates: generateClearNoteDataForEntirePuzzle(),
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
			state.candidates = generateClearNoteDataForEntirePuzzle();
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
			// console.log(state.validRows, '\n', state.validCols, '\n', state.validSections)
			state.candidates = generateClearNoteDataForEntirePuzzle();
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
					isNote: boolean,
					val: string;
					activeSquare: number;
				};
			}
		) {
			// Make sure the square the input is on is not a given square
			if (state.initialString[action.payload.activeSquare] !== empty) return

			// ! If the input is done as a note
			if (action.payload.isNote) {
				let num = parseInt(action.payload.val)
				let squareId = action.payload.activeSquare
				if (action.payload.val === empty) {
					state.candidates[squareId] = generateClearNoteDataForSingleSquare();
					return;
				}
				// Flip that note value's boolean
				state.candidates[squareId].values[num] = !state.candidates[squareId].values[num];
				// Establish the isPopulated flag
				let isPopulated = false;
				for (var i=0; i<9; i++) {
					if (state.candidates[squareId].values[i]) isPopulated = true;
				}
				state.candidates[squareId].isPopulated = isPopulated;
				return;
			}

			// ! If the input is done as a non-note value
			let row = Math.floor(action.payload.activeSquare / 9)
			let col = action.payload.activeSquare % 9
			let newUserPuzzle = [...state.userGrid];
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
		clearNotesOnSquare(state, action: { payload: number }) {
			state.candidates[action.payload] = generateClearNoteDataForSingleSquare();
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

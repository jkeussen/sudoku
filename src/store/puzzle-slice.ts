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
import {
	buildPuzzleGridFromString,
	buildPuzzleStringFromGrid,
	generateClearNoteDataForEntirePuzzle,
	generateClearNoteDataForSingleSquare,
	getRowAndColTupleFromSquareId,
	getSameValueTiles,
	isActionANoteAction,
} from "../helpers/utils";
import { empty } from "../helpers/valid-inputs";
import { CandidateTileValues } from "../components/Notes";

interface PuzzleState {
	initialGrid: string[][];
	initialString: string;
	solvedGrid: string[][];
	solvedString: string;
	userGrid: string[][];
	userString: string;
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
	initialGrid: [],
	initialString: "",
	solvedGrid: [],
	solvedString: "",
	userGrid: [],
	userString: "",
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
			state.initialGrid = puzzleGrid;
			state.initialString = puzzle;
			state.solvedGrid = solutionGrid;
			state.solvedString = solution;
			state.userGrid = [...puzzleGrid];
			state.userString = puzzle;
			state.localErrors = [];
			state.globalErrors = [];
			state.validRows = [];
			state.validCols = [];
			state.validSections = [];
			// state.sameValueTiles = [];
			state.sameValueTiles = getSameValueTiles(puzzleGrid, 0);
			state.candidates = generateClearNoteDataForEntirePuzzle();
			state.isPuzzleSolved = false;
		},
		solvePuzzle(state, action: { payload?: any }) {
			let newUserGrid = [...state.solvedGrid];
			state.userGrid = newUserGrid;
			state.userString = buildPuzzleStringFromGrid(newUserGrid);
			state.localErrors = [];
			state.globalErrors = [];
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
					noteModeEnabled: boolean;
					val: string;
					activeSquare: number;
				};
			}
		) {
			// Make sure the square the input is on is not a given square
			if (state.initialString[action.payload.activeSquare] !== empty) return;
			const activeSquare = action.payload.activeSquare;

			const isNoteAction = isActionANoteAction({
				val: action.payload.val,
				activeSquare: activeSquare,
				userGrid: state.userGrid,
				noteModeEnabled: action.payload.noteModeEnabled,
				squareHasNotes: state.candidates[activeSquare].isPopulated,
			});
			console.log(`isNoteAction: ${isNoteAction}`);

			// ! If the input is done as a note
			if (isNoteAction) {
				let num = parseInt(action.payload.val);
				if (action.payload.val === empty) {
					state.candidates[activeSquare] =
						generateClearNoteDataForSingleSquare();
						console.log(`Square ${activeSquare} has notes: ${false}`);
					return;
				}
				// Flip that note value's boolean
				state.candidates[activeSquare].values[num] =
					!state.candidates[activeSquare].values[num];
				// Establish the isPopulated flag
				let isPopulated = false;
				for (var i = 0; i < 9; i++) {
					if (state.candidates[activeSquare].values[i]) isPopulated = true;
				}
				state.candidates[activeSquare].isPopulated = isPopulated;
				console.log(`Square ${activeSquare} has notes: ${isPopulated}`);
				return;
			}

			// ! If the input is done as a non-note value
			let [row, col] = getRowAndColTupleFromSquareId(activeSquare)
			let newUserPuzzle = [...state.userGrid];
			newUserPuzzle[row][col] = action.payload.val;
			state.localErrors = getLocalErrors(newUserPuzzle, activeSquare);
			state.globalErrors = getGlobalErrors(newUserPuzzle);
			state.validRows = getValidRows(newUserPuzzle);
			state.validCols = getValidCols(newUserPuzzle);
			state.validSections = getValidSections(newUserPuzzle);
			state.sameValueTiles = getSameValueTiles(
				newUserPuzzle,
				action.payload.activeSquare
			);
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
			state.localErrors = getLocalErrors(state.userGrid, action.payload);
			state.sameValueTiles = getSameValueTiles(state.userGrid, action.payload);
		},
	},
});

export const puzzleActions = puzzleSlice.actions;
export default puzzleSlice;

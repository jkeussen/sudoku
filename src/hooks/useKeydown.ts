import type { ThunkDispatch } from "@reduxjs/toolkit";
import type { UiState } from "../store/ui-slice";
import type { PuzzleState } from "../store/puzzle-slice";
import type { AnyAction, Dispatch } from "@reduxjs/toolkit";

import { uiActions } from "../store/ui-slice";
import { puzzleActions } from "../store/puzzle-slice";

import { getRowAndColTupleFromSquareId } from "../helpers/utils";

import { validInputs, empty } from "../helpers/valid-inputs";

export interface KeyboardInput {
	e: KeyboardEvent,
	dispatch: ThunkDispatch<{
    ui: UiState;
    puzzle: PuzzleState;
	}, undefined, AnyAction> & Dispatch<AnyAction>,
	showMenu: boolean,
	noteModeEnabled: boolean,
	isTimerPaused: boolean,
	initialGrid: string[][],
	solvedString: string,
	activeSquare: number
}

const useKeydown = ({
	e,
	dispatch,
	showMenu,
	noteModeEnabled,
	isTimerPaused,
	initialGrid,
	solvedString,
	activeSquare
}: KeyboardInput) => {

	if (!validInputs.includes(e.code)) return;
	e.preventDefault();
	console.log(e)
	console.log(e.code);

	let squareToSelect: number | null;
	let arrowNavigationFlag = false;

	const [row, col] = getRowAndColTupleFromSquareId(activeSquare)
	const tileIsGiven = initialGrid[row][col] !== empty;

	switch (e.code) {
		case "Escape":
			// dispatch(puzzleActions.setActiveSquare(null));
			return;
		case "KeyM":
			dispatch(uiActions.setShowMenu(!showMenu));
			break;
		case "KeyN":
			dispatch(uiActions.setnoteModeEnabled(!noteModeEnabled));
			break;
		case "KeyP":
			dispatch(uiActions.setIsTimerPaused(!isTimerPaused));
			break;
		case "KeyH":
			dispatch(
				puzzleActions.updateUserPuzzle({
					noteModeEnabled: false,
					val: solvedString[activeSquare],
					activeSquare,
				})
			);
			dispatch(puzzleActions.clearNotesOnSquare(activeSquare));
			dispatch(puzzleActions.incrementHint());
			break;
		case "Backspace":
		case "Digit0":
		case "KeyD":
			if (tileIsGiven) return;
			dispatch(
				puzzleActions.updateUserPuzzle({
					noteModeEnabled: noteModeEnabled,
					val: empty,
					activeSquare,
				})
			);
			return;
		case "Digit1":
		case "Digit2":
		case "Digit3":
		case "Digit4":
		case "Digit5":
		case "Digit6":
		case "Digit7":
		case "Digit8":
		case "Digit9":
			if (tileIsGiven) return;
			let enteredValue = e.code.slice(-1);
			dispatch(
				puzzleActions.updateUserPuzzle({
					noteModeEnabled: noteModeEnabled,
					val: enteredValue,
					activeSquare,
				})
			);
			return;
		case "ArrowUp":
			if (row === 0) return;
			squareToSelect = (row - 1) * 9 + col;
			arrowNavigationFlag = true;
			break;
		case "ArrowRight":
			if (col === 8) return;
			squareToSelect = row * 9 + col + 1;
			arrowNavigationFlag = true;
			break;
		case "ArrowDown":
			if (row === 8) return;
			squareToSelect = (row + 1) * 9 + col;
			arrowNavigationFlag = true;
			break;
		case "ArrowLeft":
			if (col === 0) return;
			squareToSelect = row * 9 + col - 1;
			arrowNavigationFlag = true;
			break;
		default:
			break;
	}

	if (!arrowNavigationFlag) return;
	// console.log(`Select square [${rowToSelect!}, ${colToSelect!}] (${squareToSelect!})`)
	dispatch(puzzleActions.setActiveSquare(squareToSelect!));
};

export default useKeydown
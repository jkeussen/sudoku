import React, { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import classes from "./Tile.module.css";

import { validInputs, empty } from "../helpers/valid-inputs";
import { getActiveSection } from "../helpers/get-section";
import { puzzleActions } from "../store/puzzle-slice";

const Tile: React.FC<{
	id: number;
	value: string;
	section: number;
	validRows: number[];
	validCols: number[];
	validSections: number[];
	error: boolean;
}> = (props) => {
	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const row = Math.floor(props.id / 9);
	const col = props.id % 9;

	const validRow = props.validRows.includes(props.id);
	const validCol = props.validCols.includes(props.id);
	const validSection = props.validSections.includes(props.id);

	const initialGrid = useAppSelector((state) => state.puzzle.initialGrid);
	const isGiven = initialGrid[row][col] !== empty;

	const activeSquare = useAppSelector((state) => state.puzzle.activeSquare);
	const activeSection = getActiveSection(activeSquare);

	const highlightActiveRowsAndCols = useAppSelector((state) => state.ui.highlightActiveRowsAndCols);
	const highlightActiveSection = useAppSelector((state) => state.ui.highlightActiveSection);
	const highlightSameValues = useAppSelector((state) => state.ui.highlightSameValues);
	const highlightValidRowsAndCols = useAppSelector((state) => state.ui.highlightValidRowsAndCols);
	const highlightValidSections = useAppSelector((state) => state.ui.highlightValidSections);

	if (activeSquare === props.id) inputRef.current!.focus();

	const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		dispatch(puzzleActions.setActiveSquare(props.id));
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!validInputs.includes(e.code)) return;

		let rowToSelect: number | null;
		let colToSelect: number | null;
		let squareToSelect: number | null;

		switch (e.code) {
			case "Escape":
				dispatch(puzzleActions.setActiveSquare(null));
				return;
			case "Backspace":
			case "Digit0":
				if (isGiven) return;
				dispatch(
					puzzleActions.updateUserPuzzle({
						val: empty,
						row,
						col,
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
				if (isGiven) return;
				let enteredValue = e.code.slice(-1);
				if (enteredValue === props.value) return;
				dispatch(
					puzzleActions.updateUserPuzzle({
						val: enteredValue,
						row,
						col,
						activeSquare,
					})
				);
				return;
			case "ArrowUp":
				if (row === 0) return;
				rowToSelect = row - 1;
				colToSelect = col;
				squareToSelect = (row - 1) * 9 + col;
				break;
			case "ArrowRight":
				if (col === 8) return;
				rowToSelect = row;
				colToSelect = col + 1;
				squareToSelect = row * 9 + col + 1;
				break;
			case "ArrowDown":
				if (row === 8) return;
				rowToSelect = row + 1;
				colToSelect = col;
				squareToSelect = (row + 1) * 9 + col;
				break;
			case "ArrowLeft":
				if (col === 0) return;
				rowToSelect = row;
				colToSelect = col - 1;
				squareToSelect = row * 9 + col - 1;
				break;
			default:
				break;
		}

		// console.log(`Select square [${rowToSelect!}, ${colToSelect!}] (${squareToSelect!})`)
		dispatch(puzzleActions.setActiveSquare(squareToSelect!));
	};

	const userOrGiven = isGiven ? classes.givenTile : classes.userTile;
	const highlightedRow =
		highlightActiveRowsAndCols &&
		activeSquare !== null &&
		row === Math.floor(activeSquare! / 9)
			? classes.highlighted
			: "";
	const highlightedCol =
		highlightActiveRowsAndCols &&
		activeSquare !== null &&
		col === activeSquare! % 9
			? classes.highlighted
			: "";
	const highlightedSection =
		highlightActiveSection && props.section === activeSection
			? classes.highlighted
			: "";
	const valid = validRow || validCol || validSection ? classes.valid : "";
	const error = props.error ? classes.error : "";

	const css = `${classes.tile} ${userOrGiven} ${highlightedRow} ${highlightedCol} ${highlightedSection} ${valid} ${error}`;

	return (
		<div className={classes.wrapper} id={`${row}_${col}`}>
			<input
				className={css}
				ref={inputRef}
				type="text"
				value={props.value === empty ? "" : props.value}
				readOnly
				onFocus={onFocusHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</div>
	);
};

export default Tile;

import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import classes from "./Tile.module.css";

import { validInputs, empty } from "../helpers/valid-inputs";
import { sectionRefArr, getActiveSection } from "../helpers/get-section";
import { puzzleActions } from "../store/puzzle-slice";
import Notes from "./Notes";
import { uiActions } from "../store/ui-slice";

const Tile: React.FC<{
	id: number;
	value: string;
	validRows: number[];
	validCols: number[];
	validSections: number[];
	error: boolean;
}> = (props) => {
	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const row = Math.floor(props.id / 9);
	const col = props.id % 9;
	const section = sectionRefArr[row][col];

	const validRow = props.validRows.includes(row);
	const validCol = props.validCols.includes(col);
	const validSection = props.validSections.includes(section);
	const sameValueTiles = useAppSelector((state) => state.puzzle.sameValueTiles);
	const areNotesEnabled = useAppSelector((state) => state.ui.areNotesEnabled);
	const candidateValues = useAppSelector(state => state.puzzle.candidates[props.id])

	const initialGrid = useAppSelector((state) => state.puzzle.initialGrid);
	const isGiven = initialGrid[row][col] !== empty;

	const activeSquare = useAppSelector((state) => state.puzzle.activeSquare);
	const activeSection = getActiveSection(activeSquare);

	const highlightActiveRowsAndCols = useAppSelector(
		(state) => state.ui.highlightActiveRowsAndCols
	);
	const highlightActiveSection = useAppSelector(
		(state) => state.ui.highlightActiveSection
	);
	const highlightSameValues = useAppSelector(
		(state) => state.ui.highlightSameValues
	);
	const highlightValidRowsAndCols = useAppSelector(
		(state) => state.ui.highlightValidRowsAndCols
	);
	const highlightValidSections = useAppSelector(
		(state) => state.ui.highlightValidSections
	);

	useEffect(() => {
		if (activeSquare === props.id) inputRef.current?.focus();
	}, [activeSquare]);

	const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		dispatch(puzzleActions.setActiveSquare(props.id));
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log(e.code)
		if (!validInputs.includes(e.code)) return;

		let squareToSelect: number | null;
		let arrowNavigationFlag = false;

		switch (e.code) {
			case "Escape":
				// dispatch(puzzleActions.setActiveSquare(null));
				return;
			case "KeyN":
				dispatch(uiActions.setAreNotesEnabled(!areNotesEnabled))
				break;
			case "Backspace":
			case "Digit0":
				if (isGiven) return;
				dispatch(
					puzzleActions.updateUserPuzzle({
						isNote: props.value === empty ? true : areNotesEnabled,
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
				if (isGiven) return;
				let enteredValue = e.code.slice(-1);
				if (enteredValue === props.value) return;
				dispatch(
					puzzleActions.updateUserPuzzle({
						isNote: areNotesEnabled,
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
				break
			default:
				break;
		}

		if (!arrowNavigationFlag) return;
		// console.log(`Select square [${rowToSelect!}, ${colToSelect!}] (${squareToSelect!})`)
		dispatch(puzzleActions.setActiveSquare(squareToSelect!));
	};

	const userOrGiven = isGiven ? classes.givenTile : classes.userTile;
	const active = activeSquare === props.id ? classes.active : "";
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
		highlightActiveSection && section === activeSection
			? classes.highlighted
			: "";
	const highLightedSameTile =
		highlightSameValues && sameValueTiles.includes(props.id)
			? classes.sameTileValue
			: "";
	const valid =
		(highlightValidRowsAndCols && validRow) ||
		(highlightValidRowsAndCols && validCol) ||
		(highlightValidSections && validSection)
			? classes.valid
			: "";
	const error = props.error ? classes.error : "";

	const css = `${classes.tile} ${userOrGiven} ${active} ${highlightedRow} ${highlightedCol} ${highlightedSection} ${highLightedSameTile} ${valid} ${error}`;

	return (
		<div className={classes.wrapper} id={`${row}_${col}`}>
			{candidateValues.isPopulated && (
				<Notes tileId={props.id} candidateVals={candidateValues} />
			)}
			<input
				tabIndex={-1}
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

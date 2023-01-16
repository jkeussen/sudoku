import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { validInputs, empty } from "../helpers/valid-inputs";
import { sectionRefArr, getActiveSection } from "../helpers/get-section";

import { puzzleActions } from "../store/puzzle-slice";
import { uiActions } from "../store/ui-slice";

import Notes from "./Notes";

import classes from "./Tile.module.css";
import { getRowAndColTupleFromSquareId } from "../helpers/utils";

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

	const activeSquare = useAppSelector((state) => state.puzzle.activeSquare);
	const activeSection = getActiveSection(activeSquare);
	const [row, col] = getRowAndColTupleFromSquareId(props.id)
	const [activeRow, activeCol] = getRowAndColTupleFromSquareId(activeSquare)
	const section = sectionRefArr[row][col];
	const initialGrid = useAppSelector((state) => state.puzzle.initialGrid);
	const solvedString = useAppSelector((state) => state.puzzle.solvedString);

	const tileIsInValidRow = props.validRows.includes(row);
	const tileIsInValidCol = props.validCols.includes(col);
	const tileIsInValidSection = props.validSections.includes(section);
	const tileIsGiven = initialGrid[row][col] !== empty;
	const tileIsCorrect = props.value === solvedString[props.id]
	const tilesWithSameValue = useAppSelector((state) => state.puzzle.sameValueTiles);

	const showMenu = useAppSelector(state => state.ui.showMenu)
	const isTimerPaused = useAppSelector(state => state.ui.isTimerPaused)
	const noteModeEnabled = useAppSelector((state) => state.ui.noteModeEnabled);
	const candidateValues = useAppSelector(state => state.puzzle.candidates[props.id])

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

	// ! Build CSS classes for the tile
	const userOrGiven = tileIsGiven ? classes.givenTile : classes.userTile;
	const isActiveSquare = activeSquare === props.id ? classes.active : "";
	const highlighted =
		(highlightActiveRowsAndCols && (row === activeRow || col === activeCol)) ||
		(highlightActiveSection && (section === activeSection))
			? classes.highlighted
			: "";
	const sameTileValueAsActiveSquare =
		(highlightSameValues && tilesWithSameValue.includes(props.id))
			? classes.sameTileValue
			: "";
	const valid =
		(highlightValidRowsAndCols && (tileIsInValidRow || tileIsInValidCol)) ||
		(highlightValidSections && tileIsInValidSection)
			? classes.valid
			: "";
	const error = props.error ? classes.error : "";
	const wrongValue = 
		(props.value !== empty && !tileIsCorrect) 
			? classes.wrongValue
			: ""
	const css = `${classes.tile} ${userOrGiven} ${isActiveSquare} ${highlighted} ${sameTileValueAsActiveSquare} ${valid} ${error} ${wrongValue}`;

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
			/>
		</div>
	);
};

export default Tile;

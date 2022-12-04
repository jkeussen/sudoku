import React, { useState } from "react";
import classes from "./Tile.module.css";

const Tile: React.FC<{
	row: number;
	activeRow: number | null,
	col: number;
	activeCol: number | null,
	section: number,
	activeSection: number | null,
	value: string;
	highlighted: {
		highlightActiveRow: boolean,
		highlightActiveCol: boolean,
		highlightActiveSection: boolean,
	};
	isGiven: boolean;
	setActiveRow: React.Dispatch<React.SetStateAction<number | null>>;
	setActiveCol: React.Dispatch<React.SetStateAction<number | null>>;
	setUserPuzzle: (val: string, row: number, col: number) => void;
}> = (props) => {
	
	const [userVal, setUserVal] = useState<string>("");

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const enteredValue = e.target.value[e.target.value.length - 1];
		if (enteredValue === undefined) {
			setUserVal('')
			props.setUserPuzzle('.', props.row, props.col)
			return
		}
		if (!Number(enteredValue)) return;
		setUserVal(enteredValue);
		props.setUserPuzzle(enteredValue, props.row, props.col)
	};

	const onFocusHandler = () => {
		props.setActiveCol(props.col)
		props.setActiveRow(props.row)
	}

	const highlightedRow = props.highlighted.highlightActiveRow && props.row === props.activeRow
		? classes.highlighted : null
	const highlightedCol = props.highlighted.highlightActiveCol && props.col === props.activeCol
		? classes.highlighted : null
	const highlightedSection = props.highlighted.highlightActiveSection && props.section === props.activeSection
		? classes.highlighted : null

	const css = `${props.isGiven ? classes.givenTile : classes.userTile} ${highlightedRow} ${highlightedCol} ${highlightedSection}`;

	return (
		<div className={classes.wrapper} id={`${props.row}_${props.col}`}>
			<input
				className={css}
				type="text"
				value={props.isGiven ? props.value : userVal}
				onChange={onChangeHandler}
				onFocus={onFocusHandler}
				disabled={props.isGiven}
			/>
		</div>
	);
};

export default Tile;

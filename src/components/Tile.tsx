import React, { useState } from "react";
import classes from "./Tile.module.css";

const Tile: React.FC<{
	row: number;
	col: number;
	value: string;
	highlighted: boolean;
	isGiven: boolean;
	setHighlightedRow: React.Dispatch<React.SetStateAction<number | null>>;
	setHighlightedCol: React.Dispatch<React.SetStateAction<number | null>>;
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
		props.setHighlightedCol(props.col)
		props.setHighlightedRow(props.row)
	}

	const css = `${props.isGiven ? classes.givenTile : classes.userTile} ${props.highlighted ? classes.highlighted : ''}`;

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

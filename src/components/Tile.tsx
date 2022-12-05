import React, { useRef, useState } from "react";
import classes from "./Tile.module.css";

const Tile: React.FC<{
	id: number;
	activeSquare: number | null;
	setActiveSquare: React.Dispatch<React.SetStateAction<number | null>>;
	row: number;
	activeRow: number | null;
	validRow: boolean;
	col: number;
	activeCol: number | null;
	validCol: boolean;
	section: number;
	activeSection: number | null;	
	value: string;
	highlighted: {
		highlightActiveRow: boolean;
		highlightActiveCol: boolean;
		highlightActiveSection: boolean;
	};
	isGiven: boolean;
	setActiveRow: React.Dispatch<React.SetStateAction<number | null>>;
	setActiveCol: React.Dispatch<React.SetStateAction<number | null>>;
	setUserPuzzle: (val: string, row: number, col: number) => void;
}> = (props) => {

	const inputRef = useRef<HTMLInputElement>(null);
	const [userVal, setUserVal] = useState<string>("");

	if (props.activeSquare === props.id) inputRef.current!.focus()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(e)
		// console.log(e.target.value)
		const enteredValue = e.target.value[e.target.value.length - 1];
		// const enteredValue = e.nativeEvent.data;
		console.log(enteredValue)
		if (enteredValue === userVal) return;
		if (enteredValue === undefined) {
			setUserVal("");
			props.setUserPuzzle(".", props.row, props.col);
			return;
		}
		if (!Number(enteredValue)) return;
		setUserVal(enteredValue);
		props.setUserPuzzle(enteredValue, props.row, props.col);
	};

	const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
		props.setActiveCol(props.col);
		props.setActiveRow(props.row);
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"].includes(e.code)) return
		let rowToSelect: number | null;
		let colToSelect: number | null;
		let squareToSelect: number | null;
		if (e.code === "ArrowUp") {
			if (props.row === 0) return
			rowToSelect = props.row-1;
			colToSelect = props.col;
			squareToSelect = (props.row-1)*9 + props.col
		}
		else if (e.code === "ArrowRight") {
			if (props.col === 8) return
			rowToSelect = props.row;
			colToSelect = props.col+1;
			squareToSelect = (props.row)*9 + props.col+1
		}
		else if (e.code === "ArrowDown") {
			if (props.row === 8) return
			rowToSelect = props.row+1;
			colToSelect = props.col;
			squareToSelect = (props.row+1)*9 + props.col
		}
		else if (e.code === "ArrowLeft") {
			if (props.col === 0) return
			rowToSelect = props.row;
			colToSelect = props.col-1;
			squareToSelect = (props.row)*9 + props.col-1
		}
		else if (e.code === "Escape") {
			rowToSelect = null;
			colToSelect = null;
			squareToSelect = null;
		}
		console.log(`Select square [${rowToSelect!}, ${colToSelect!}] (${squareToSelect!})`)
		props.setActiveSquare(squareToSelect!)
	}

	// Adds the highlighted style depending on if active rows/cols/sections should be highlighted
	const highlightedRow =
		props.highlighted.highlightActiveRow && props.row === props.activeRow
			? classes.highlighted
			: null;
	const highlightedCol =
		props.highlighted.highlightActiveCol && props.col === props.activeCol
			? classes.highlighted
			: null;
	const highlightedSection =
		props.highlighted.highlightActiveSection &&
		props.section === props.activeSection
			? classes.highlighted
			: null;

	const css = `${
		props.isGiven ? classes.givenTile : classes.userTile
	} ${highlightedRow} ${highlightedCol} ${highlightedSection} ${
		props.validRow || props.validCol ? classes.valid : null
	}`;

	return (
		<div className={classes.wrapper} id={`${props.row}_${props.col}`}>
			<input
				ref={inputRef}
				className={css}
				type="text"
				value={props.isGiven ? props.value : userVal}
				onChange={onChangeHandler}
				onFocus={onFocusHandler}
				onKeyDown={onKeyDownHandler}
				disabled={props.isGiven}
			/>
		</div>
	);
};

export default Tile;

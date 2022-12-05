import React, { useRef, useState } from "react";
import classes from "./Tile.module.css";

const Tile: React.FC<{
	id: number;
	activeSquare: number | null;
	setActiveSquare: React.Dispatch<React.SetStateAction<number | null>>;
	validRow: boolean;
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
	setUserPuzzle: (val: string, row: number, col: number) => void;
}> = (props) => {

	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState<string>("");

	const row = Math.floor(props.id / 9)
	const col = props.id % 9

	if (props.activeSquare === props.id) inputRef.current!.focus()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.isGiven) return;
		// console.log(e)
		// console.log(e.target.value)
		const enteredValue = e.target.value[e.target.value.length - 1];
		// const enteredValue = e.nativeEvent.data;
		console.log(enteredValue)
		if (enteredValue === value) return;
		if (enteredValue === undefined) {
			setValue("");
			props.setUserPuzzle(".", row, col);
			return;
		}
		if (!Number(enteredValue)) return;
		setValue(enteredValue);
		props.setUserPuzzle(enteredValue, row, col);
	};

	const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
		props.setActiveSquare(props.id)
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"].includes(e.code)) return
		let rowToSelect: number | null;
		let colToSelect: number | null;
		let squareToSelect: number | null;
		if (e.code === "ArrowUp") {
			if (row === 0) return
			rowToSelect = row-1;
			colToSelect = col;
			squareToSelect = (row-1)*9 + col
		}
		else if (e.code === "ArrowRight") {
			if (col === 8) return
			rowToSelect = row;
			colToSelect = col+1;
			squareToSelect = (row)*9 + col+1
		}
		else if (e.code === "ArrowDown") {
			if (row === 8) return
			rowToSelect = row+1;
			colToSelect = col;
			squareToSelect = (row+1)*9 + col
		}
		else if (e.code === "ArrowLeft") {
			if (col === 0) return
			rowToSelect = row;
			colToSelect = col-1;
			squareToSelect = (row)*9 + col-1
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
		props.highlighted.highlightActiveRow && props.activeSquare && row === Math.floor(props.activeSquare! / 9)
			? classes.highlighted
			: null;
	const highlightedCol =
		props.highlighted.highlightActiveCol && props.activeSquare && col === props.activeSquare! % 9
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
		<div className={classes.wrapper} id={`${row}_${col}`}>
			<input
				ref={inputRef}
				className={css}
				type="text"
				value={props.isGiven ? props.value : value}
				onChange={onChangeHandler}
				onFocus={onFocusHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</div>
	);
};

export default Tile;

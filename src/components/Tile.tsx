import React, { useRef, useState } from "react";
import classes from "./Tile.module.css";

import { validInputs, empty } from "../helpers/valid-inputs";
import { getActiveSection } from "../helpers/get-section";

const Tile: React.FC<{
	id: number;
	activeSquare: number | null;
	setActiveSquare: React.Dispatch<React.SetStateAction<number | null>>;
	validRow: boolean;
	validCol: boolean;
	section: number;
	value: string;
	highlighted: {
		highlightActiveRow: boolean;
		highlightActiveCol: boolean;
		highlightActiveSection: boolean;
	};
	isGiven: boolean;
	error: boolean;
	setUserPuzzle: (val: string, row: number, col: number) => void;
}> = (props) => {

	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState<string>("");

	const row = Math.floor(props.id / 9)
	const col = props.id % 9
	const activeSection = getActiveSection(props.activeSquare)

	if (props.activeSquare === props.id) inputRef.current!.focus()

	const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		props.setActiveSquare(props.id)
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!validInputs.includes(e.code)) return
		
		let rowToSelect: number | null;
		let colToSelect: number | null;
		let squareToSelect: number | null;

		switch (e.code) {
			case "Escape":
				props.setActiveSquare(null)
				return;
			case "Backspace":
			case "Digit0":
				if (props.isGiven) return
				setValue("")
				props.setUserPuzzle(empty, row, col);
				inputRef.current!.blur()
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
				if (props.isGiven) return;
				let enteredValue = e.code.slice(-1)
				if (enteredValue === value) return;
				setValue(enteredValue)
				props.setUserPuzzle(enteredValue, row, col);
				return;
			case "ArrowUp":
				if (row === 0) return
				rowToSelect = row-1;
				colToSelect = col;
				squareToSelect = (row-1)*9 + col
				break;
			case "ArrowRight":
				if (col === 8) return
				rowToSelect = row;
				colToSelect = col+1;
				squareToSelect = (row)*9 + col+1
				break;
			case "ArrowDown":
				if (row === 8) return
				rowToSelect = row+1;
				colToSelect = col;
				squareToSelect = (row+1)*9 + col
				break;
			case "ArrowLeft":
				if (col === 0) return
				rowToSelect = row;
				colToSelect = col-1;
				squareToSelect = (row)*9 + col-1
				break;
			default:
				break;
		}

		console.log(`Select square [${rowToSelect!}, ${colToSelect!}] (${squareToSelect!})`)
		props.setActiveSquare(squareToSelect!)
	}

	const userOrGiven = props.isGiven ? classes.givenTile : classes.userTile
	const highlightedRow =
		props.highlighted.highlightActiveRow && props.activeSquare !== null && row === Math.floor(props.activeSquare! / 9)
			? classes.highlighted
			: '';
	const highlightedCol =
		props.highlighted.highlightActiveCol && props.activeSquare !== null && col === props.activeSquare! % 9
			? classes.highlighted
			: '';
	const highlightedSection =
		props.highlighted.highlightActiveSection && props.section === activeSection
			? classes.highlighted
			: '';
	const valid = props.validRow || props.validCol ? classes.valid : ''
	const error = props.error ? classes.error : ''

	const css = `${classes.tile} ${userOrGiven} ${highlightedRow} ${highlightedCol} ${highlightedSection} ${valid} ${error}`;

	return (
		<div className={classes.wrapper} id={`${row}_${col}`}>
			<input
				className={css}
				ref={inputRef}
				type="text"
				value={props.isGiven ? props.value : value}
				// onChange={onChangeHandler}
				readOnly
				onFocus={onFocusHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</div>
	);
};

export default Tile;

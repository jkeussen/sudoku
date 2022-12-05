import { empty } from "./valid-inputs"

export const getErrors = (puzzle: (number | string)[][], selSquare: number | null): number[] => {
	if (!puzzle || !selSquare) return []

	let errors: number[] = []

	let selRow = Math.floor(selSquare / 9)
	let selCol = selSquare % 9
	let selVal = puzzle[selRow][selCol]
	let rowData = puzzle[selRow]
	let colData = puzzle.map(rowData => rowData[selCol])

	// for all tiles in the row
	rowData.forEach((tileVal, curCol) => {
		if (tileVal === empty) return;
		// if the current tile isn't the active tile
		// and the value of the tile = selected tile value
		// if (curCol === selCol) return
		if (tileVal === selVal) {
			// push that tile's ID to the error array
			errors.push((selRow * 9) + curCol)
		}
	})
	// for all tiles in the column
	colData.forEach((tileVal, curRow) => {
		if (tileVal === empty) return;
		// if the current tile isn't the active tile
		// and the value of the tile = selected tile value
		// if (curRow === selRow) return;
		if (tileVal === selVal) {
			// push that tile's ID to the error array
			errors.push((curRow * 9) + selCol)
		}
	})

	return errors
}

export const getAllErrors = (puzzle: (number | string)[][]) => {
	if (!puzzle) return []

	let errors: number[] = []

	puzzle.forEach((row, index) => {
		// find duplicates in the row, 
		// calculate their ids, push to array
	})

	// build array of columns 
	let rotatedPuzzle = [];
	for (var i=0; i<puzzle.length; i++) {
		let col = []
		for (var j=0; j<puzzle[i].length; j++) {
			col.push(puzzle[j][i])
		}
		rotatedPuzzle.push(col)
	}

	puzzle.forEach((row, index) => {
		// find duplicates in the col, 
		// calculate their ids, push to array
	})
}
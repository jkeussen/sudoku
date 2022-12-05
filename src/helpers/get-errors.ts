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
	// for all tiles in the section
	// TODO: write section algo

	return errors
}

export const getAllErrors = (puzzle: (number | string)[][]) => {
	if (!puzzle) return []

	let errors: number[] = []

	puzzle.forEach((row, i) => {
		// check if there are duplicates
		if (new Set(row).size === row.length) return;
		// create an object with tile values in the row as key names
		// and arrays of those tile IDs for each occuring value
		let alreadySeen: {[key: string]: number[]} = {}
		row.forEach((tileVal, j) => {
			if (tileVal === '0') return;
			const id = i*9+j
			if (!alreadySeen[tileVal]) alreadySeen[tileVal] = []
			alreadySeen[tileVal].push(id)
		})
		Object.keys(alreadySeen).forEach(key => {
			if (alreadySeen[key].length > 1) {
				errors = errors.concat(alreadySeen[key])
			}
		})
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

	rotatedPuzzle.forEach((col, j) => {
		// check if there are duplicates
		if (new Set(col).size === col.length) return;
		let alreadySeen: {[key: string]: number[]} = {}
		col.forEach((tileVal, i) => {
			if (tileVal === '0') return;
			const id = i*9+j
			if (!alreadySeen[tileVal]) alreadySeen[tileVal] = []
			alreadySeen[tileVal].push(id)
		})
		Object.keys(alreadySeen).forEach(key => {
			if (alreadySeen[key].length > 1) {
				errors = errors.concat(alreadySeen[key])
			}
		})
	})

	return errors;
}
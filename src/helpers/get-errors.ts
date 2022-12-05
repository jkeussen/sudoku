import { empty } from "./valid-inputs"
import { sectionRefArr, sectionIdArr } from "./get-section"

export const getLocalErrors = (puzzle: string[][], selSquare: number | null): number[] => {
	if (!puzzle || selSquare === null) return []

	let errors: number[] = []

	let selRow = Math.floor(selSquare / 9)
	let selCol = selSquare % 9
	let selVal = puzzle[selRow][selCol]
	let selSection = sectionRefArr[selRow][selCol]
	let rowData = puzzle[selRow]
	let colData = puzzle.map(rowData => rowData[selCol])

	// for all tiles in the row
	rowData.forEach((tileVal, curCol) => {
		if (tileVal === empty || curCol === selCol) return;
		if (tileVal === selVal) {
			errors.push((selRow * 9) + curCol)
			errors.push(selSquare)
		}
	})
	// for all tiles in the column
	colData.forEach((tileVal, curRow) => {
		if (tileVal === empty || curRow === selRow) return;
		if (tileVal === selVal) {
			errors.push((curRow * 9) + selCol)
			errors.push(selSquare)
		}
	})
	// build section value array
	let sectionData: string[] = []
	puzzle.forEach((row, i) => {
		row.forEach((tileVal, j) => {
			if (sectionRefArr[i][j] === selSection) sectionData.push(tileVal)
		})
	})
	// for all tiles in the section
	let alreadySeen: {[key: string]: number[]} = {}
	sectionData.forEach((tileVal, i) => {
		if (tileVal === empty) return;
		const id = sectionIdArr[selSection][i]
		// if (tileVal === empty || selSquare === id) return;
		// if (tileVal === selVal) {
		// 	errors.push(id)
		// 	errors.push(selSquare)
		// }
		if (!alreadySeen[tileVal]) alreadySeen[tileVal] = []
		alreadySeen[tileVal].push(id)
	})
	Object.keys(alreadySeen).forEach(key => {
		if (alreadySeen[key].length > 1) {
			errors = errors.concat(alreadySeen[key])
		}
	})

	return errors
}

export const getGlobalErrors = (puzzle: (number | string)[][]) => {
	if (!puzzle) return []

	let errors: number[] = []

	puzzle.forEach((row, i) => {
		// check if there are duplicates
		if (new Set(row).size === row.length) return;
		// create an object with tile values in the row as key names
		// and arrays of those tile IDs for each occuring value
		let alreadySeen: {[key: string]: number[]} = {}
		row.forEach((tileVal, j) => {
			if (tileVal === empty) return;
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
			if (tileVal === empty) return;
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

	// build array of sections
	let sections: string[][] = [[],[],[],[],[],[],[],[],[]]
	puzzle.forEach((row, i) => {
		row.forEach((tileVal, j) => {
			let section = sectionRefArr[i][j];
			sections[section].push(tileVal.toString())
		})
	})

	sections.forEach((section, i) => {
		// check if there are duplicates
		if (new Set(section).size === section.length) return;
		// create an object with tile values in the section as key names
		// and arrays of those tile IDs for each occuring value
		let alreadySeen: {[key: string]: number[]} = {}
		section.forEach((tileVal, j) => {
			if (tileVal === empty) return;
			const id = sectionIdArr[i][j]
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
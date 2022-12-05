export const getValidRows = (puzzle: string[][]) => {
	let validRows = [];
	for (var i=0; i<puzzle.length; i++) {
		if (puzzle[i].includes('.')) continue;
		if (puzzle[i].includes('0')) continue;
		if (new Set(puzzle[i]).size !== puzzle[i].length) continue
		validRows.push(i)
	}
	return validRows
}

export const getValidCols = (puzzle: string[][]) => {
	let rotatedPuzzle = []
	let validCols = []
	// build array of columns
	for (var i=0; i<puzzle.length; i++) {
		let col = []
		for (var j=0; j<puzzle[i].length; j++) {
			col.push(puzzle[j][i])
		}
		rotatedPuzzle.push(col)
	}
	for (var i=0; i<rotatedPuzzle.length; i++) {
		if (rotatedPuzzle[i].includes('.')) continue;
		if (rotatedPuzzle[i].includes('0')) continue;
		if (new Set(rotatedPuzzle[i]).size !== rotatedPuzzle[i].length) continue
		validCols.push(i)
	}
	return validCols
}

export const getValidSections = (puzzle: string[][]) => {

}
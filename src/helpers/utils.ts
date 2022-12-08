import { sectionRefArr } from "./get-section"

export const buildPuzzleGridFromString = (str: string): string[][] => {
	let arr = [];
	for(var i=0; i<9; i++) {
		arr.push([...str.split('').splice(i*9,9)])
	}
	return arr;
}

export const buildPuzzleStringFromGrid = (grid: string[][]) => {
	return grid.join('').replaceAll(',','')
}

export const buildSections = (puzzle: string[][]) => {
	let sections: string[][] = [[],[],[],[],[],[],[],[],[]]
	puzzle.forEach((row, i) => {
		row.forEach((tileVal, j) => {
			let section = sectionRefArr[i][j];
			sections[section].push(tileVal.toString())
		})
	})
	return sections
}

export const rotatePuzzle = (puzzle: string[][]) => {
	let rotatedPuzzle = [];
	for (var i=0; i<puzzle.length; i++) {
		let col = []
		for (var j=0; j<puzzle[i].length; j++) {
			col.push(puzzle[j][i])
		}
		rotatedPuzzle.push(col)
	}
	return rotatedPuzzle;
}
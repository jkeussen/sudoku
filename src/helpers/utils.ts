import { CandidateTileValues } from "../components/Notes";
import { sectionRefArr } from "./get-section"
import { empty } from "./valid-inputs";

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

export const getSameValueTiles = (puzzle: string[][], activeSquare: number): number[] => {
	let activeRow = Math.floor(activeSquare / 9);
	let activeCol = activeSquare % 9;
	let activeValue = puzzle[activeRow][activeCol]

	if (activeValue === empty) return [];
	if (!activeValue) {
		console.error('Could not determine the active value')
		return [];
	}

	let sameValues: number[] = [];

	puzzle.forEach((row, i) => {
		row.forEach((value, j) => {
			if (value === activeValue) {
				let tileId = i * 9 + j
				sameValues.push(tileId)
			}
		})
	})

	return sameValues;
}

export const generateBlankCandidateValues = () => {
	let totalCandidateValueArray: CandidateTileValues[] = [];
	for (let i=0; i<81; i++) {
		let noteObject: CandidateTileValues = { isPopulated: false, values: {} };
		for (let j=0; j<9; j++) {
			noteObject.values[j] = false;
		}
		totalCandidateValueArray.push(noteObject)
	}
	return totalCandidateValueArray;
}
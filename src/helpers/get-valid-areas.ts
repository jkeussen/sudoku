import { buildSections } from "./utils";
import { empty } from "./valid-inputs";

export const getValidRows = (puzzle: string[][]) => {
	let validRows = [];
	for (var i=0; i<puzzle.length; i++) {
		if (puzzle[i].includes(empty)) continue;
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
		if (rotatedPuzzle[i].includes(empty)) continue;
		if (new Set(rotatedPuzzle[i]).size !== rotatedPuzzle[i].length) continue
		validCols.push(i)
	}
	return validCols
}

export const getValidSections = (puzzle: string[][]) => {
	let sections = buildSections(puzzle);
	let validSections: number[] = [];
	sections.forEach((section, i) => {
		let valuesInSection = new Set(section)
		if (valuesInSection.size === 9 && !valuesInSection.has(empty)) validSections.push(i)
	})
	return validSections;
}
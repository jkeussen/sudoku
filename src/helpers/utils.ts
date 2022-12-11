import { CandidateTileValues } from "../components/Notes";
import { sectionRefArr } from "./get-section";
import { empty } from "./valid-inputs";

export const buildPuzzleGridFromString = (str: string): string[][] => {
	let arr = [];
	for (var i = 0; i < 9; i++) {
		arr.push([...str.split("").splice(i * 9, 9)]);
	}
	return arr;
};

export const buildPuzzleStringFromGrid = (grid: string[][]) => {
	return grid.join("").replaceAll(",", "");
};

export const buildSections = (puzzle: string[][]) => {
	let sections: string[][] = [[], [], [], [], [], [], [], [], []];
	puzzle.forEach((row, i) => {
		row.forEach((tileVal, j) => {
			let section = sectionRefArr[i][j];
			sections[section].push(tileVal.toString());
		});
	});
	return sections;
};

export const rotatePuzzle = (puzzle: string[][]) => {
	let rotatedPuzzle = [];
	for (var i = 0; i < puzzle.length; i++) {
		let col = [];
		for (var j = 0; j < puzzle[i].length; j++) {
			col.push(puzzle[j][i]);
		}
		rotatedPuzzle.push(col);
	}
	return rotatedPuzzle;
};

export const getSameValueTiles = (
	puzzle: string[][],
	activeSquare: number
): number[] => {
	let activeRow = Math.floor(activeSquare / 9);
	let activeCol = activeSquare % 9;
	let activeValue = puzzle[activeRow][activeCol];

	if (activeValue === empty) return [];
	if (!activeValue) {
		console.error("Could not determine the active value");
		return [];
	}

	let sameValues: number[] = [];

	puzzle.forEach((row, i) => {
		row.forEach((value, j) => {
			if (value === activeValue) {
				let tileId = i * 9 + j;
				sameValues.push(tileId);
			}
		});
	});

	return sameValues;
};

export const generateClearNoteDataForEntirePuzzle = () => {
	let totalCandidateValueArray: CandidateTileValues[] = [];
	for (let i = 0; i < 81; i++) {
		let noteObject: CandidateTileValues = { isPopulated: false, values: {} };
		for (let j = 0; j < 9; j++) {
			noteObject.values[j] = false;
		}
		totalCandidateValueArray.push(noteObject);
	}
	return totalCandidateValueArray;
};

export const generateClearNoteDataForSingleSquare = () => {
	let singleCandidateValue: CandidateTileValues = {
		isPopulated: false,
		values: {},
	};
	for (let j = 0; j < 9; j++) {
		singleCandidateValue.values[j] = false;
	}
	return singleCandidateValue;
};

export const getRowAndColTupleFromSquareId = (id: number) => {
	const row = Math.floor(id / 9);
	const col = id % 9;
	return [row, col];
};

interface NoteDeletionArgs {
	val: string,
	activeSquare: number;
	userGrid: string[][];
	noteModeEnabled: boolean;
	squareHasNotes: boolean;
}

export const isActionANoteAction = ({
	val,
	activeSquare,
	userGrid,
	noteModeEnabled,
	squareHasNotes,
}: NoteDeletionArgs) => {
	if (val !== empty) return noteModeEnabled;

	const [row, col] = getRowAndColTupleFromSquareId(activeSquare);
	const squareHasValue = userGrid[row][col] !== empty;

	let isActionANoteAction = noteModeEnabled;
	if (noteModeEnabled && squareHasNotes) return true;
	if (!noteModeEnabled && squareHasValue) return false;
	if (noteModeEnabled && !squareHasNotes && squareHasValue) return false;
	if (!noteModeEnabled && !squareHasValue && squareHasNotes) return true;

	return isActionANoteAction;
};
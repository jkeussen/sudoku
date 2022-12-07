import { createSlice } from '@reduxjs/toolkit'
import { generateSudoku } from '../lib/generate-unique-puzzle'

const initialState = {
	initialString: '',
	solvedString: '',
	initialGrid: [],
	solvedGrid: [],
	userGrid: [],
	activeSquare: null ,
	validRows: [],
	validCols: [],
	validSections: [],
	localErrors: new Set(),
	globalErrors: new Set(),

}

const puzzleSlice = createSlice({
	name: 'puzzle',
	initialState: initialState,
	reducers: {

	}
})
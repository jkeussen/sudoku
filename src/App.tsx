import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks';

import Header from './components/Header';
import Tile from './components/Tile';
import MobileInputs from './components/MobileInputs';

import { buildPuzzleGridFromString } from './helpers/utils';
import { sectionRefArr } from './helpers/get-section';
import { getValidRows, getValidCols, getValidSections } from './helpers/get-valid-areas';
import { getGlobalErrors, getLocalErrors } from './helpers/get-errors';
import { empty } from './helpers/valid-inputs';

import { getSudoku } from './lib/sudoku';
import { generateSudoku } from './lib/generate-unique-puzzle';

import classes from './App.module.css'
import { puzzleActions } from './store/puzzle-slice';

const sudoku = getSudoku();

function App() {

  const dispatch = useAppDispatch();
  
  const [rawPuzzle, setRawPuzzle] = useState(generateSudoku('insane')[0])
  // const [rawPuzzle, setRawPuzzle] = useState(".1...8...3.472169...6....1....9.253..421.378..358.6....9....1...213874.9...5...2.")
  // console.log(generateSudoku('easy'))
  
  const [activeSquare, setActiveSquare] = useState<number | null>(null)
  const [validRows, setValidRows] = useState<number[]>([])
  const [validCols, setValidCols] = useState<number[]>([])
  const [validSections, setValidSections] = useState<number[]>([])
  
  const [initialPuzzle, setInitialPuzzle] = useState<string[][]>(buildPuzzleGridFromString(rawPuzzle))
  const [userPuzzle, setUserPuzzle] = useState<string[][]>(buildPuzzleGridFromString(rawPuzzle))
  const updateUserPuzzle = (val: string, row: number, col: number): void => {
    let newUserPuzzle = [...userPuzzle]
    newUserPuzzle[row][col] = val
    setUserPuzzle(newUserPuzzle)
  }

  // const [localErrors, setLocalErrors] = useState<Set<number>>(new Set())
  // const [globalErrors, setGlobalErrors] = useState<Set<number>>(new Set())
  const globalErrors = useAppSelector(state => state.puzzle.globalErrors)
  const localErrors = useAppSelector(state => state.puzzle.localErrors)

  useEffect(() => {
    // setGlobalErrors(new Set(getGlobalErrors(userPuzzle)))
    dispatch(puzzleActions.setGlobalErrors(getGlobalErrors(userPuzzle)))
    // check for valid rows and columns
    setValidRows(getValidRows(userPuzzle))
    setValidCols(getValidCols(userPuzzle))
    setValidSections(getValidSections(userPuzzle))
    // console.log('Global Errors: \n', globalErrors)
  }, [userPuzzle])
  
  useEffect(() => {
    // setLocalErrors(new Set(getLocalErrors(userPuzzle, activeSquare)))
    dispatch(puzzleActions.setLocalErrors(getLocalErrors(userPuzzle, activeSquare)))
    // console.log('Local Errors: \n', localErrors)
  }, [userPuzzle, activeSquare])

  const puzzle = userPuzzle.map((row:string[], i:number) => {
    return row.map((col:string, j:number) => {
      const id = (i*9) + j
      const section = sectionRefArr[i][j]
      return <Tile 
        id={id}
        activeSquare={activeSquare}
        setActiveSquare={setActiveSquare}
        validRow={validRows.includes(i)}
        validCol={validCols.includes(j)}
        validSection={validSections.includes(section)}
        section={section}
        setUserPuzzle={updateUserPuzzle}
        isGiven={initialPuzzle[i][j] !== empty}
        value={userPuzzle[i][j]} 
        error={globalErrors.includes(id)}
        key={`gridTile_${i}_${j}`} 
      />
    })
  })

  const dividers = useMemo(() => {
    return Array.apply(null, Array(9)).map((x, i) => { 
      const id = `section_${i+1}`
      return <div className={`${classes.divider} ${classes[id]}`} id={id} key={id}/>; 
    })
  }, [])

  const solvePuzzle = (puzzle: string[][]) => {
    let string = sudoku.board_grid_to_string(puzzle)
    console.log(string)
    let solvedString = sudoku.solve(string)
    let solvedGrid = sudoku.board_string_to_grid(solvedString)
    setUserPuzzle(solvedGrid)
  }
  
  // return <Tile key={`gridTile_${index}`} value={char} />
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.puzzleGrid}>
        {dividers}
        {puzzle}
      </div>
      <MobileInputs />
      <button onClick={() => solvePuzzle(userPuzzle)}>
        Solve
      </button>
    </div>
  )
}

export default App

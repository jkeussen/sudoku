import { useEffect, useMemo, useState } from 'react'

import Header from './components/Header';
import Tile from './components/Tile';

import { sectionRefArr } from './helpers/get-section';
import { getValidRows, getValidCols, getValidSections } from './helpers/get-valid-areas';
import { getGlobalErrors, getLocalErrors } from './helpers/get-errors';
import { empty } from './helpers/valid-inputs';

import classes from './App.module.css'
import MobileInputs from './components/MobileInputs';

function App() {
  
  const rawPuzzle = ".1...8...3.472169...6....1....9.253..421.378..358.6....9....1...213874.9...5...2."
  
  const buildGrid = (str: string): string[][] => {
    let arr = [];
    for(var i=0; i<9; i++) {
      arr.push([...str.split('').splice(i*9,9)])
    }
    return arr;
  }
  
  const [activeSquare, setActiveSquare] = useState<number | null>(null)
  const [validRows, setValidRows] = useState<number[]>([])
  // let validRows: number[] = []
  const [validCols, setValidCols] = useState<number[]>([])
  // let validCols: number[] = []
  const [validSections, setValidSections] = useState<number[]>([])
  // let validSections: number[] = []
  
  const [initialPuzzle, setInitialPuzzle] = useState<string[][]>(buildGrid(rawPuzzle))
  const [userPuzzle, setUserPuzzle] = useState<string[][]>(buildGrid(rawPuzzle))
  const updateUserPuzzle = (val: string, row: number, col: number): void => {
    let newUserPuzzle = [...userPuzzle]
    newUserPuzzle[row][col] = val
    // check for valid rows and columns
    setValidRows(getValidRows(newUserPuzzle))
    setValidCols(getValidCols(newUserPuzzle))
    setValidSections(getValidSections(newUserPuzzle))
    // setValidRows(validRows)
    // setValidCols(validCols)
    // update current puzzle state
    setUserPuzzle(newUserPuzzle)
  }

  const [highlightActiveRow, setHighlightActiveRow] = useState<boolean>(true)
  const [highlightActiveCol, setHighlightActiveCol] = useState<boolean>(true)
  const [highlightActiveSection, setHighlightActiveSection] = useState<boolean>(false)

  const [localErrors, setLocalErrors] = useState<Set<number>>(new Set())
  const [globalErrors, setGlobalErrors] = useState<Set<number>>(new Set())

  useEffect(() => {
    setGlobalErrors(new Set(getGlobalErrors(userPuzzle)))
    // console.log('Global Errors: \n', globalErrors)
  }, [userPuzzle])

  useEffect(() => {
    setLocalErrors(new Set(getLocalErrors(userPuzzle, activeSquare)))
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
        highlighted={{highlightActiveRow, highlightActiveCol, highlightActiveSection}}
        setUserPuzzle={updateUserPuzzle}
        isGiven={initialPuzzle[i][j] !== empty}
        value={userPuzzle[i][j]} 
        error={globalErrors.has(id)}
        key={`gridTile_${i}_${j}`} 
      />
    })
  })

  const generateDividers = () => {
    let dividers = []
    for(var i=0; i<9; i++) {
      let id = `section_${i+1}`
      dividers.push(
        <div className={`${classes.divider} ${classes[id]}`} id={id} key={id}/>
      )
    }
    return dividers;
  }
  const dividers = useMemo(() => generateDividers(), [])
  
  // return <Tile key={`gridTile_${index}`} value={char} />
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.puzzleGrid}>
        {dividers}
        {puzzle}
      </div>
      <MobileInputs />
    </div>
  )
}

export default App

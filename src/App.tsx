import { useMemo, useState } from 'react'

import Tile from './components/Tile';

import { sectionRefArr } from './helpers/section-lookup';
import { getValidRows, getValidCols } from './helpers/get-valid-areas';

import classes from './App.module.css'

function App() {
  
  const rawPuzzle = ".1...8...3.472169...6....1....9.253..421.378..358.6....9....1...213874.9...5...2."
  
  const buildGrid = (str: string): string[][] => {
    let arr = [];
    for(var i=0; i<9; i++) {
      arr.push([...str.split('').splice(i*9,9)])
    }
    return arr;
  }
  
  const [grid, setGrid] = useState<string[][]>(buildGrid(rawPuzzle))
  const [activeSquare, setActiveSquare] = useState<number | null>(null)
  const [activeRow, setActiveRow] = useState<number | null>(null)
  const [activeCol, setActiveCol] = useState<number | null>(null)
  const [validRows, setValidRows] = useState<number[]>([])
  const [validCols, setValidCols] = useState<number[]>([])
  
  const [userPuzzle, setUserPuzzle] = useState<string[][]>(buildGrid(rawPuzzle))
  const updateUserPuzzle = (val: string, row: number, col: number): void => {
    let newUserPuzzle = [...userPuzzle]
    newUserPuzzle[row][col] = val
    // check for valid rows and columns
    const validRows = getValidRows(newUserPuzzle)
    const validCols = getValidCols(newUserPuzzle)
    // console.log('Valid Rows: [' + validRows +']')
    // console.log('Valid Cols: [' + validCols +']')
    setValidRows(validRows)
    setValidCols(validCols)
  
    setUserPuzzle(newUserPuzzle)
  }

  const [highlightActiveRow, setHighlightActiveRow] = useState<boolean>(true)
  const [highlightActiveCol, setHighlightActiveCol] = useState<boolean>(true)
  const [highlightActiveSection, setHighlightActiveSection] = useState<boolean>(false)
  
  const activeSection = activeRow !== null && activeCol !== null
    ? sectionRefArr[activeRow][activeCol] 
    : null;

  const puzzle = grid.map((row:string[], i:number) => {
    return row.map((col:string, j:number) => {
      return <Tile 
        id={(i*9) + j}
        activeSquare={activeSquare}
        setActiveSquare={setActiveSquare}
        row={i}
        activeRow={activeRow}
        validRow={validRows.includes(i)}
        setActiveRow={setActiveRow}
        col={j}
        activeCol={activeCol}
        validCol={validCols.includes(j)}
        setActiveCol={setActiveCol}
        section={sectionRefArr[i][j]}
        activeSection={activeSection}
        highlighted={{highlightActiveRow, highlightActiveCol, highlightActiveSection}}
        setUserPuzzle={updateUserPuzzle}
        isGiven={grid[i][j] !== '.'}
        value={grid[i][j]} 
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
      <h1>Sudoku</h1>
      <div className={classes.puzzleGrid}>
        {dividers}
        {puzzle}
      </div>
    </div>
  )
}

export default App

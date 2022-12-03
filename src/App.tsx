import { useMemo, useState } from 'react'

import Tile from './components/Tile';

import classes from './App.module.css'

function App() {
  
  const testData = ".1...8...3.472169...6....1....9.253..421.378..358.6....9....1...213874.9...5...2.";

  const buildGrid = (str: string) => {
    let arr = [];
    for(var i=0; i<9; i++) {
      arr.push([...str.split('').splice(i*9,9)])
    }
    return arr;
  }

  const [grid, setGrid] = useState(buildGrid(testData))
  console.log(grid)

  const puzzle = grid.map((row:string[], i:number) => {
    return row.map((col:string, j:number) => {
      return <Tile 
        row={i+1}
        col={j+1}
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
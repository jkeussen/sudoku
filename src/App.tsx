import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Header from "./components/Header";
import Tile from "./components/Tile";
import MobileInputs from "./components/MobileInputs";

import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";

function App() {
	const dispatch = useAppDispatch();

	const userGrid = useAppSelector((state) => state.puzzle.userGrid);

	const validRows = useAppSelector((state) => state.puzzle.validRows);
	const validCols = useAppSelector((state) => state.puzzle.validCols);
	const validSections = useAppSelector((state) => state.puzzle.validSections);

	const localErrors = useAppSelector((state) => state.puzzle.localErrors);
	const globalErrors = useAppSelector((state) => state.puzzle.globalErrors);

	useEffect(() => {
		dispatch(puzzleActions.generatePuzzle());
	}, []);

	const puzzle = userGrid.map((row: string[], i: number) => {
		return row.map((col: string, j: number) => {
			const id = i * 9 + j;
			return (
				<Tile
					id={id}
					value={userGrid[i][j]}
					validRows={validRows}
          validCols={validCols}
          validSections={validSections}
					error={globalErrors.includes(id)}
					key={`gridTile_${i}_${j}`}
				/>
			);
		});
	});

	const dividers = useMemo(() => {
		return Array.apply(null, Array(9)).map((x, i) => {
			const id = `section_${i + 1}`;
			return (
				<div className={`${classes.divider} ${classes[id]}`} id={id} key={id} />
			);
		});
	}, []);

	// return <Tile key={`gridTile_${index}`} value={char} />
	return (
		<div className={classes.app}>
			<Header />
			<div className={classes.puzzleGrid}>
				{dividers}
				{puzzle}
			</div>
			<MobileInputs />
			<button onClick={() => dispatch(puzzleActions.solvePuzzle())}>
				Solve
			</button>
		</div>
	);
}

export default App;

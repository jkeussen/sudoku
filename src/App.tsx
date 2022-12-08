import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Header from "./components/Header";
import Tile from "./components/Tile";
import MobileInputs from "./components/MobileInputs";

import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";
import Puzzle from "./components/Puzzle";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(puzzleActions.generatePuzzle());
	}, []);

	// return <Tile key={`gridTile_${index}`} value={char} />
	return (
		<div className={classes.app}>
			<Header />
			<Puzzle />
			<MobileInputs />
			<button onClick={() => dispatch(puzzleActions.solvePuzzle())}>
				Solve
			</button>
		</div>
	);
}

export default App;

import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";

import Header from "./components/Header";
import Puzzle from "./components/Puzzle";
import Controls from "./components/Controls";

import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";

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
			<Controls />
		</div>
	);
}

export default App;

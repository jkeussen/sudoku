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
		dispatch(puzzleActions.generatePuzzle('medium'));
	}, []);

	// return <Tile key={`gridTile_${index}`} value={char} />
	return (
		<div className={classes.wrapper + ' light'}>
			<div className={classes.app}>
				<Header />
				<Puzzle />
				<Controls />
			</div>
		</div>
	);
}

export default App;

import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";

import Header from "./components/Header";
import MobileInputs from "./components/MobileInputs";

import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";
import Puzzle from "./components/Puzzle";
import Options from "./components/Options";

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
			<div className={classes.controls}>
				<MobileInputs />
				<Options />
			</div>
		</div>
	);
}

export default App;

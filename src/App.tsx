import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Header from "./components/Header";
import Puzzle from "./components/Puzzle";
import Controls from "./components/Controls";

import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";
import Menu from "./components/Menu";

function App() {
	const dispatch = useAppDispatch();

	const showMenu = useAppSelector(state => state.ui.showMenu)
	const showDarkTheme = useAppSelector(state => state.ui.showDarkTheme)

	useEffect(() => {
		dispatch(puzzleActions.generatePuzzle('medium'));
	}, []);

	// return <Tile key={`gridTile_${index}`} value={char} />
	return (
		<div className={classes.wrapper + `${showDarkTheme ? ' dark' : ' light'}` + `${showMenu ? ' frozen' : ''}`}>
			<div className={classes.app}>
				{showMenu && <Menu/>}
				<Header />
				<Puzzle />
				<Controls />
			</div>
		</div>
	);
}

export default App;

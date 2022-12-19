import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Menu from "./components/Menu";
import Header from "./components/Header";
import PuzzleInfo from "./components/PuzzleInfo";
import Puzzle from "./components/Puzzle";
import Controls from "./components/Controls";

import { uiActions } from "./store/ui-slice";
import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";

function App() {
	const dispatch = useAppDispatch();

	const showMenu = useAppSelector((state) => state.ui.showMenu);
	const showDarkTheme = useAppSelector((state) => state.ui.showDarkTheme);

	const handleUnload = () => {
		dispatch(uiActions.saveUi());
		dispatch(puzzleActions.savePuzzle());
		localStorage.setItem("canResume", "true");
	};

	// Create a puzzle on initial render or load previous puzzle
	useEffect(() => {
		// Write state to localStorage when tab/window is closed
		window.addEventListener("beforeunload", handleUnload);
		const returnFn = () =>
			window.removeEventListener("beforeunload", handleUnload);

		// If there's no old puzzle in localStorage, make a new one
		if (!localStorage.getItem("canResume")) {
			console.log("Generate new puzzle.");
			dispatch(puzzleActions.generatePuzzle("medium"));
			return returnFn;
		}

		try {
			// dispatch(puzzleActions.generatePuzzle('medium'));

			console.log("Load old puzzle.");
			let oldUiState = JSON.parse(localStorage.getItem("uiState")!);
			let oldPuzzleState = JSON.parse(localStorage.getItem("puzzleState")!);
			dispatch(uiActions.loadUi(oldUiState));
			dispatch(puzzleActions.loadPuzzle(oldPuzzleState));
		} catch (err) {
			console.log(err);
			dispatch(puzzleActions.generatePuzzle("medium"));
		}
		return returnFn;
	}, []);

	// return <Tile key={`gridTile_${index}`} value={char} />
	return (
		<div
			className={
				classes.wrapper +
				`${showDarkTheme ? " dark" : " light"}` +
				`${showMenu ? " frozen" : ""}`
			}
		>
			<div className={classes.app}>
				{showMenu && <Menu />}
				<Header />
				<Puzzle />
				<Controls />
				<PuzzleInfo />
			</div>
		</div>
	);
}

export default App;

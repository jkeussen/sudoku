import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Menu from "./components/Menu";
import Header from "./components/Header";
import PuzzleInfo from "./components/PuzzleInfo";
import Puzzle from "./components/Puzzle";
import Controls from "./components/Controls";

import { getRowAndColTupleFromSquareId } from "./helpers/utils";

import { uiActions } from "./store/ui-slice";
import { puzzleActions } from "./store/puzzle-slice";

import classes from "./App.module.css";
import Footer from "./components/Footer";
import useKeydown from "./hooks/useKeydown";

function App() {
	const dispatch = useAppDispatch();

	const showMenu = useAppSelector((state) => state.ui.showMenu);
	const showDarkTheme = useAppSelector((state) => state.ui.showDarkTheme);

	const isTimerPaused = useAppSelector(state => state.ui.isTimerPaused)
	const noteModeEnabled = useAppSelector((state) => state.ui.noteModeEnabled);
	const activeSquare = useAppSelector((state) => state.puzzle.activeSquare);
	const solvedString = useAppSelector((state) => state.puzzle.solvedString);
	const initialGrid = useAppSelector((state) => state.puzzle.initialGrid);

	const handleUnload = () => {
		dispatch(uiActions.saveUi());
		dispatch(puzzleActions.savePuzzle());
		localStorage.setItem("canResume", "true");
	};

	// Add global event listener for keyboard inputs
	useEffect(() => {
		const keyInputListener = (e: KeyboardEvent) => {
			useKeydown({
				e: e,
				dispatch,
				showMenu,
				noteModeEnabled,
				isTimerPaused,
				initialGrid,
				solvedString,
				activeSquare
			})
		}
		window.addEventListener("keydown", keyInputListener)
		return () => window.removeEventListener("keydown", keyInputListener)
	}, [showMenu, noteModeEnabled, isTimerPaused, initialGrid, solvedString, activeSquare])

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
				<div className={classes.under}>
					<PuzzleInfo />
					<Controls />
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default App;

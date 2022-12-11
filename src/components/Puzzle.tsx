import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import Tile from "./Tile";

import { puzzleActions } from "../store/puzzle-slice";

import classes from "./Puzzle.module.css";
import buttonCss from '../styles/Buttons.module.css'
import { uiActions } from "../store/ui-slice";

const Puzzle = () => {

	const dispatch = useAppDispatch();

	const userGrid = useAppSelector((state) => state.puzzle.userGrid);

	const validRows = useAppSelector((state) => state.puzzle.validRows);
	const validCols = useAppSelector((state) => state.puzzle.validCols);
	const validSections = useAppSelector((state) => state.puzzle.validSections);

	const isTimerPaused = useAppSelector(state => state.ui.isTimerPaused)

	const localErrors = useAppSelector((state) => state.puzzle.localErrors);
	const globalErrors = useAppSelector((state) => state.puzzle.globalErrors);

	useEffect(() => {
		dispatch(puzzleActions.generatePuzzle('hard'));
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

	const resumeGameHandler = () => {
		dispatch(uiActions.setIsTimerPaused(false))
	}

	return(
		<div className={classes.puzzleGrid}>
			{isTimerPaused && <div className={classes.pauseShield}>
				<span>
					Game paused.
				</span>
				<button className={buttonCss.button} onClick={resumeGameHandler}>
					<span className="material-icons">play_arrow</span>
					Resume
				</button>
			</div>}
			{dividers}
			{puzzle}
		</div>
	)
}

export default Puzzle;
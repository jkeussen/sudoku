import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";

import Tile from "./Tile";
import PauseOverlay from "./PauseOverlay";

import classes from "./Puzzle.module.css";

const Puzzle = () => {
	const userGrid = useAppSelector((state) => state.puzzle.userGrid);

	const validRows = useAppSelector((state) => state.puzzle.validRows);
	const validCols = useAppSelector((state) => state.puzzle.validCols);
	const validSections = useAppSelector((state) => state.puzzle.validSections);

	const isTimerPaused = useAppSelector((state) => state.ui.isTimerPaused);
	const isPuzzleSolved = useAppSelector((state) => state.puzzle.isPuzzleSolved);

	const localErrors = useAppSelector((state) => state.puzzle.localErrors);
	const globalErrors = useAppSelector((state) => state.puzzle.globalErrors);

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

	return (
		<div className={classes.puzzleGrid}>
			{isTimerPaused && !isPuzzleSolved && 
				<PauseOverlay />
			}
			{dividers}
			{puzzle}
		</div>
	);
};

export default Puzzle;

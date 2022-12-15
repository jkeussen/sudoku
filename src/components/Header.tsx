import { useEffect, useState } from "react";

import classes from "./Header.module.css";
import buttonCss from "../styles/Buttons.module.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { uiActions } from "../store/ui-slice";

const Header: React.FC = (props?) => {
	const dispatch = useAppDispatch();

	const showMenu = useAppSelector(state => state.ui.showMenu)
	const isTimerPaused = useAppSelector((state) => state.ui.isTimerPaused);
	const isTimerDisabled = useAppSelector((state) => state.ui.isTimerDisabled);
	const timerSecondsElapsed = useAppSelector((state) => state.ui.timerSecondsElapsed);
	const isPuzzleSolved = useAppSelector(state => state.puzzle.isPuzzleSolved)

	const minutes = Math.floor(timerSecondsElapsed / 60).toString();
	const seconds = (timerSecondsElapsed % 60).toString();

	const timerToggleHandler = () => {
		dispatch(uiActions.setIsTimerPaused(!isTimerPaused))
	};

	useEffect(() => {
		// Pause and disable timer if puzzle is solved
		if (isPuzzleSolved) {
			dispatch(uiActions.setIsTimerDisabled(true))
			// dispatch(uiActions.setIsTimerPaused(true))
		} else {
			if (isTimerDisabled) dispatch(uiActions.setIsTimerDisabled(false))
		}
		// Pause/unpause timer when isTimerPaused changes
		let timer: ReturnType<typeof setInterval>;
		if (!isTimerPaused && !isPuzzleSolved) {
			timer = setInterval(() => {
				dispatch(uiActions.incrementTimer(1))
			}, 1000);
		} else {
			clearInterval(timer!);
			console.log("clear");
		}
		return () => clearInterval(timer);
	}, [isTimerPaused, isPuzzleSolved]);

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<button
					// onClick={() => {alert('Not yet implemented... :(')}}
					onClick={() => {dispatch(uiActions.setShowMenu(!showMenu))}}
					className={`${buttonCss.button} ${buttonCss.rounded}`}
				>
					<span className="material-icons">menu</span>
				</button>
				<h1>Sudoku</h1>
			</div>
			<div className={classes.timer}>
				<h2>
					{minutes}:{seconds.length > 1 ? seconds : `0${seconds}`}
				</h2>
				<button
					onClick={timerToggleHandler}
					className={`${buttonCss.button} ${buttonCss.rounded}`}
					disabled={isTimerDisabled}
				>
					<span className="material-icons">
						{!isTimerDisabled && isTimerPaused && "play_arrow"}
						{!isTimerDisabled && !isTimerPaused && "pause"}
						{isTimerDisabled && 'celebration'}
					</span>
				</button>
			</div>
		</header>
	);
};

export default Header;

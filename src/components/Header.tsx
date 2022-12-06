import { useEffect, useState } from 'react';

import classes from './Header.module.css'

const Header: React.FC = (props?) => {

	const [secondsElapsed, setSecondsElapsed] = useState<number>(0)
	const [isPaused, setIsPaused] = useState<boolean>(false);

	const minutes = Math.floor(secondsElapsed / 60).toString()
	const seconds = (secondsElapsed % 60).toString()

	const timerToggleHandler = () => {
		setIsPaused(bool => !bool)
	}

	useEffect(() => {
		let timer: ReturnType<typeof setInterval>;
		if (!isPaused) {
			timer = setInterval(() => {
				setSecondsElapsed(num => num+1)
			}, 1000)
		} else {
			clearInterval(timer!)
			console.log('clear')
		}
		return () => clearInterval(timer)
	}, [isPaused])

	return(
		<header className={classes.header}>
			<h1>Sudoku</h1>
			<div className={classes.timer}>
				<h2>{minutes}:{seconds.length > 1 ? seconds : `0${seconds}`}</h2>
				<button onClick={timerToggleHandler}>
					<span className="material-icons">{isPaused ? 'play_arrow' : 'pause'}</span>
				</button>
			</div>
		</header>
	)
}

export default Header;
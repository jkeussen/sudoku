import { empty } from "../helpers/valid-inputs"
import { useAppSelector } from "../store/hooks"

import classes from './PuzzleInfo.module.css'

const PuzzleInfo = () => {

	const difficulty = useAppSelector(state => state.puzzle.difficulty)
	const userString = useAppSelector(state => state.puzzle.userString)
	const hintsUsed = useAppSelector(state => state.puzzle.hintsUsed)
	const mistakesMade = useAppSelector(state => state.puzzle.mistakesMade)

	return(
		<div className={classes.puzzleInfo}>
			<p>
				<span>Difficulty:</span>
				<span>{difficulty.replaceAll('-', ' ')}</span>
			</p>
			<p>
				<span>Tiles:</span>
				<span>{userString.replaceAll(empty, '').length}/81</span>
			</p>
			<p>
				<span>Mistakes:</span>
				<span>{mistakesMade}</span>
			</p>
			<p>
				<span>Hints:</span>
				<span>{hintsUsed}</span>
			</p>
		</div>
	)
}

export default PuzzleInfo
import { useAppDispatch } from '../store/hooks';
import { puzzleActions } from '../store/puzzle-slice';

import classes from './Options.module.css'
import buttonCss from '../styles/Buttons.module.css'

const Options: React.FC = () => {
	const dispatch = useAppDispatch();

	return(
		<div className={classes.options}>
			<button 
				className={buttonCss.button}
				onClick={() => dispatch(puzzleActions.solvePuzzle())}
			>
				Show Solution
			</button>
			<button 
				className={buttonCss.button}
				onClick={() => dispatch(puzzleActions.generatePuzzle())}
			>
				New Game
			</button>
		</div>
	)
}

export default Options;
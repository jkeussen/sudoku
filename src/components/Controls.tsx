import classes from './Controls.module.css'
import buttonCss from '../styles/Buttons.module.css'

import { useAppDispatch } from "../store/hooks";
import { puzzleActions } from "../store/puzzle-slice";

const NumberButton: React.FC<{
	value: number;
}> = (props) => {
	return(
		<button className={`${buttonCss.button} ${classes.numberButton}`}>
			{props.value}
		</button>
	)
}

const Numbers: React.FC<{}> = (props?) => {
	const nums = [1,2,3,4,5,6,7,8,9]
	return(
		<div className={classes.numbers}>
			{nums.map((num) => <NumberButton
				key={`numberButton_${num}`}
				value={num}
			/>)}
		</div>
	)
}

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

const Controls = () => {
	return (
		<div className={classes.controls}>
			<Numbers />
			<Options />
		</div>
	);
};

export default Controls;

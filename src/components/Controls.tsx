import classes from './Controls.module.css'
import buttonCss from '../styles/Buttons.module.css'

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { puzzleActions } from "../store/puzzle-slice";
import { empty } from '../helpers/valid-inputs';
import { uiActions } from '../store/ui-slice';

import Switch from './Switch';

const Number: React.FC<{
	number: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const activeSquare = useAppSelector(state => state.puzzle.activeSquare)

	const clickHandler = () => {
		dispatch(
			puzzleActions.updateUserPuzzle({
				val: props.number,
				activeSquare,
			})
		);
	}

	return(<button 
		className={buttonCss.button}
		onClick={clickHandler}
	>
		{props.number}
	</button>)
}

const TopRow: React.FC = () => {
	const dispatch = useAppDispatch();

	const activeSquare = useAppSelector(state => state.puzzle.activeSquare)
	const solvedString = useAppSelector(state => state.puzzle.solvedString)

	const deleteHandler = () => {
		dispatch(
			puzzleActions.updateUserPuzzle({
				val: empty,
				activeSquare,
			})
		);
	}

	const hintHandler = () => {
		dispatch(
			puzzleActions.updateUserPuzzle({
				val: solvedString[activeSquare],
				activeSquare,
			})
		);
	}

	const notesHandler = () => {
		alert('Not yet implemented... :(')
	}

	return(
		<div className={classes.topRow}>
			<button className={buttonCss.button} onClick={notesHandler}>
				<span className="material-icons">edit_note</span>
				Notes
			</button>
			<button className={buttonCss.button} onClick={hintHandler}>
				<span className="material-icons">question_mark</span>
				Hint
			</button>
			<button className={buttonCss.button} onClick={deleteHandler}>
				<span className="material-icons">backspace</span>
				Delete
			</button>
		</div>
	)
}

const Numbers: React.FC = () => {
	const nums = ['1','2','3','4','5','6','7','8','9']

	return(
		<div className={classes.col1}>
			<TopRow />
			<div className={classes.numbers}>
				{nums.map((num) => {
					return <Number 
						key={`numberButton_${num}`}
						number={num}
					/>
				})}
			</div>
		</div>
	)
}

const Options: React.FC = () => {
	const dispatch = useAppDispatch();

	const highlightActiveRowsAndCols = useAppSelector(state => state.ui.highlightActiveRowsAndCols)
	const highlightActiveSection = useAppSelector(state => state.ui.highlightActiveSection)
	const highlightSameValues = useAppSelector(state => state.ui.highlightSameValues)
	const highlightValidRowsAndCols = useAppSelector(state => state.ui.highlightValidRowsAndCols)
	const highlightValidSections = useAppSelector(state => state.ui.highlightValidSections)

	const showSolutionHandler = () => {
		dispatch(puzzleActions.solvePuzzle())
	}

	const newGameHandler = () => {
		dispatch(puzzleActions.generatePuzzle())
		dispatch(uiActions.setTimerSecondsElapsed(0))
		dispatch(uiActions.setIsTimerPaused(false))
	}

	const toggleHighlightActiveRowsAndCols = () => {
		dispatch(uiActions.setHighlightActiveRowsAndCols(!highlightActiveRowsAndCols))
	}
	
	const toggleHighlightActiveSection = () => {
		dispatch(uiActions.setHighlightActiveSection(!highlightActiveSection))
	}
	
	const toggleHighlightValidRowsAndCols = () => {
		dispatch(uiActions.setHighlightValidRowsAndCols(!highlightValidRowsAndCols))
	}
	
	const toggleHighlightValidSections = () => {
		dispatch(uiActions.setHighlightValidSections(!highlightValidSections))
	}

	return(
		<div className={classes.col2}>
			<div className={classes.gameActions}>
			<button 
				className={buttonCss.button}
				onClick={showSolutionHandler}
			>
				Show Solution
			</button>
			<button 
				className={buttonCss.button}
				onClick={newGameHandler}
			>
				New Game
			</button>
			</div>
			<div className={classes.switches}>
				<Switch 
					label="Highlight active rows & columns"
					checked={highlightActiveRowsAndCols}
					onChange={toggleHighlightActiveRowsAndCols}
				/>
				<Switch 
					label="Highlight active section"
					checked={highlightActiveSection}
					onChange={toggleHighlightActiveSection}
				/>
				<Switch 
					label="Highlight valid rows & columns"
					checked={highlightValidRowsAndCols}
					onChange={toggleHighlightValidRowsAndCols}
				/>
				<Switch 
					label="Highlight valid sections"
					checked={highlightValidSections}
					onChange={toggleHighlightValidSections}
				/>
			</div>
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

import { PuzzleDifficultyString } from '../../lib/generate-unique-puzzle';
import { useAppDispatch } from '../../store/hooks';
import { puzzleActions } from '../../store/puzzle-slice';
import { uiActions } from '../../store/ui-slice';

import buttonCss from '../../styles/Buttons.module.css'

const GameDifficultySelect: React.FC<{
	className: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const newGameHandler = (difficulty: PuzzleDifficultyString) => {
		dispatch(puzzleActions.generatePuzzle(difficulty));
		dispatch(uiActions.setShowMenu(false));
		dispatch(uiActions.setShowDifficultySelect(false));
		dispatch(uiActions.setTimerSecondsElapsed(0));
		dispatch(uiActions.setIsTimerPaused(false));
	};

	return(
		<div className={props.className}>
			<button className={buttonCss.button} onClick={() => newGameHandler('easy')}>Easy</button>
			<button className={buttonCss.button} onClick={() => newGameHandler('medium')}>Medium</button>
			<button className={buttonCss.button} onClick={() => newGameHandler('hard')}>Hard</button>
			<button className={buttonCss.button} onClick={() => newGameHandler('very-hard')}>Very Hard</button>
			<button className={buttonCss.button} onClick={() => newGameHandler('insane')}>Insane</button>
			<button className={buttonCss.button} onClick={() => newGameHandler('inhuman')}>Inhuman</button>
		</div>
	)
}

export default GameDifficultySelect
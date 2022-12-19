import { useAppDispatch } from '../store/hooks';
import { uiActions } from '../store/ui-slice';

import buttonCss from '../styles/Buttons.module.css'
import overlayCss from '../styles/PuzzleOverlay.module.css'

const PauseOverlay = () => {
	const dispatch = useAppDispatch();

	const resumeGameHandler = () => {
		dispatch(uiActions.setIsTimerPaused(false));
	};

	return (
		<div className={overlayCss.puzzleOverlay}>
			<span>Game Paused...</span>
			<button
				className={buttonCss.button}
				onClick={resumeGameHandler}
				style={{ paddingRight: "0.85rem" }}
			>
				<span className="material-icons">play_arrow</span>
				Resume
			</button>
		</div>
	);
};

export default PauseOverlay
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { puzzleActions } from "../../store/puzzle-slice";
import { uiActions } from "../../store/ui-slice";
import buttonCss from "../../styles/Buttons.module.css";

const GameActions: React.FC<{
	className: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const showDifficultySelect = useAppSelector(
		(state) => state.ui.showDifficultySelect
	);

	const showSolutionHandler = () => {
		dispatch(puzzleActions.solvePuzzle());
	};

	const newGameHandler = () => {
		dispatch(uiActions.setShowDifficultySelect(!showDifficultySelect));
	};

	return (
		<div className={props.className}>
			<button className={buttonCss.button} onClick={showSolutionHandler}>
				Show Solution
			</button>
			<button
				className={`${buttonCss.button} ${
					showDifficultySelect ? buttonCss.pressed : ""
				}`}
				onClick={newGameHandler}
			>
				New Game
			</button>
		</div>
	);
};

export default GameActions;

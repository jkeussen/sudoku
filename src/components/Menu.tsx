import { useAppDispatch, useAppSelector } from "../store/hooks";
import { uiActions } from "../store/ui-slice";
import { puzzleActions } from "../store/puzzle-slice";

import Modal from "./Modal";
import GameDifficultySelect from "./Controls/GameDifficultySelect";
import OptionsSwitches from "./Controls/OptionsSwitches";

import buttonCss from "../styles/Buttons.module.css";
import classes from './Menu.module.css'

const Menu = () => {
	const dispatch = useAppDispatch();

	const buttonStyle = `${buttonCss.button}`;

	const onCloseHandler = () => {
		console.log("close menu modal");
		dispatch(uiActions.collapseMenuItems());
		dispatch(uiActions.setShowMenu(false));
	};

	const showDifficultySelect = useAppSelector(
		(state) => state.ui.showDifficultySelect
	);

	const showOptionsSwitches = useAppSelector(
		(state) => state.ui.showOptionsSwitches
	);

	const showSolutionHandler = () => {
		onCloseHandler();
		dispatch(puzzleActions.solvePuzzle());
	};

	const newGameHandler = () => {
		dispatch(uiActions.collapseMenuItems());
		dispatch(uiActions.setShowDifficultySelect(!showDifficultySelect));
	};

	const showOptionsHandler = () => {
		dispatch(uiActions.collapseMenuItems());
		dispatch(uiActions.setShowOptionsSwitches(!showOptionsSwitches));
	};

	return (
		<Modal
			title="Menu"
			noBackButton={true}
			onBack={() => {}}
			noCloseButton={false}
			onClose={onCloseHandler}
		>
			<button
				className={`${buttonStyle} ${
					showDifficultySelect ? buttonCss.pressed : ""
				}`}
				onClick={newGameHandler}
			>
				New Game
			</button>
			{showDifficultySelect && (
				<GameDifficultySelect className={classes.difficultySelect} />
			)}
			<button
				className={`${buttonStyle} ${
					showOptionsSwitches ? buttonCss.pressed : ""
				}`}
				onClick={showOptionsHandler}
			>
				Options
			</button>
			{showOptionsSwitches && (
				<OptionsSwitches className={classes.switches} />
			)}
			<button className={buttonStyle} onClick={showSolutionHandler}>
				Show Solution
			</button>
		</Modal>
	);
};

export default Menu;

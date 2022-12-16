import Modal from "./Modal";

import buttonCss from '../styles/Buttons.module.css'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { uiActions } from "../store/ui-slice";
import { puzzleActions } from "../store/puzzle-slice";
import OptionsSwitches from "./Controls/OptionsSwitches";

import controlsCss from './Controls.module.css'
import GameDifficultySelect from "./Controls/GameDifficultySelect";

const Menu = () => {

	const dispatch = useAppDispatch();

	const buttonStyle = `${buttonCss.button}`

	const onCloseHandler = () => {
		console.log('close menu modal')
		dispatch(uiActions.setShowMenu(false))
	}

	const showDifficultySelect = useAppSelector(
		(state) => state.ui.showDifficultySelect
	);

	const showOptionsSwitches = useAppSelector(
		(state) => state.ui.showOptionsSwitches
	);

	const showSolutionHandler = () => {
		onCloseHandler();
		dispatch(uiActions.collapseMenuItems());
		dispatch(puzzleActions.solvePuzzle());
	};

	const newGameHandler = () => {
		dispatch(uiActions.collapseMenuItems());
		dispatch(uiActions.setShowDifficultySelect(!showDifficultySelect));
	};

	const showOptionsHandler = () => {
		dispatch(uiActions.collapseMenuItems());
		dispatch(uiActions.setShowOptionsSwitches(!showOptionsSwitches));
	}

	return(<Modal 
		title="Menu"
		noBackButton={true}
		onBack={() => {}}
		noCloseButton={false}
		onClose={onCloseHandler}
	>
		<button className={`${buttonStyle} ${showDifficultySelect ? buttonCss.pressed : ''}`} onClick={newGameHandler}>
			New Game
		</button>
		{showDifficultySelect && <GameDifficultySelect className={controlsCss.difficultySelect} />}
		<button className={buttonStyle} onClick={showSolutionHandler}>
			Show Solution
		</button>
		<button className={`${buttonStyle} ${showOptionsSwitches ? buttonCss.pressed : ''}`} onClick={showOptionsHandler}>
			Options
		</button>
		{showOptionsSwitches && <OptionsSwitches className={controlsCss.switches}/>}
	</Modal>)
}

export default Menu;
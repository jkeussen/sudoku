import Modal from "./Modal";

import buttonCss from '../styles/Buttons.module.css'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { uiActions } from "../store/ui-slice";

const Menu = () => {

	const dispatch = useAppDispatch();

	const buttonStyle = `${buttonCss.button}`

	const onCloseHandler = () => {
		console.log('close menu modal')
		dispatch(uiActions.setShowMenu(false))
	}

	return(<Modal 
		title="Menu"
		noBackButton={true}
		onBack={() => {}}
		noCloseButton={false}
		onClose={onCloseHandler}
	>
		<button className={buttonStyle}>
			New Game
		</button>
		<button className={buttonStyle}>
			Show Solution
		</button>
		<button className={buttonStyle}>
			Options
		</button>
	</Modal>)
}

export default Menu;
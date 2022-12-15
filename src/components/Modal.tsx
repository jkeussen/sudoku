import React from 'react'
import { createPortal } from 'react-dom'

import classes from './Modal.module.css'
import buttonCss from '../styles/Buttons.module.css'
import { useAppSelector } from '../store/hooks'

const Modal: React.FC<{
	title: string,
	children: React.ReactNode,
	noBackButton?: boolean,
	onBack?: () => void,
	noCloseButton?: boolean,
	onClose: () => void
}> = (props) => {

	const showDarkTheme = useAppSelector(state => state.ui.showDarkTheme)
	const theme = showDarkTheme ? 'dark' : 'light'

	const buttonStyle = `${buttonCss.button} ${buttonCss.rounded}`

	const backButtonhandler = () => {
		if (props.onBack) props.onBack();
	}

	const closeButtonHandler = () => {
		if (props.onClose) props.onClose();
	}

	return(createPortal(
		<div className={`${classes.modalWrapper} ${theme}`} onClick={closeButtonHandler}>
			<div className={classes.modal} onClick={(e) => {e.stopPropagation()}}>
				<div className={classes.modalHeader}>
					{!props.noBackButton && <button className={`${buttonStyle} ${classes.back}`} onClick={backButtonhandler}>
						<span className="material-icons">arrow_back</span>
					</button>}
					<h2>
						{props.title}
					</h2>
					{!props.noCloseButton && <button className={`${buttonStyle} ${classes.close}`} onClick={closeButtonHandler}>
						<span className="material-icons">close</span>
					</button>}
				</div>
				{props.children && <div className={classes.modalContent}>
					{props.children}
				</div>}
			</div>
		</div>, 
	document.getElementById('modal-root')!))
}

export default Modal;
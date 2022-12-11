import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { puzzleActions } from "../../store/puzzle-slice";

import buttonCss from '../../styles/Buttons.module.css'

const NumberInputButton: React.FC<{
	number: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const activeSquare = useAppSelector((state) => state.puzzle.activeSquare);
	const areNotesEnabled = useAppSelector(state => state.ui.areNotesEnabled)

	const clickHandler = () => {
		dispatch(
			puzzleActions.updateUserPuzzle({
				isNote: areNotesEnabled,
				val: props.number,
				activeSquare,
			})
		);
	};

	return (
		<button className={buttonCss.button} onClick={clickHandler}>
			{props.number}
		</button>
	);
};

export default NumberInputButton
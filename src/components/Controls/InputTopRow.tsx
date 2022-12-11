import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { puzzleActions } from "../../store/puzzle-slice";
import { empty } from "../../helpers/valid-inputs";

import buttonCss from '../../styles/Buttons.module.css'

const InputTopRow: React.FC<{
	className: string;
}> = (props) => {
	const dispatch = useAppDispatch();

	const activeSquare = useAppSelector((state) => state.puzzle.activeSquare);
	const solvedString = useAppSelector((state) => state.puzzle.solvedString);

	const deleteHandler = () => {
		dispatch(
			puzzleActions.updateUserPuzzle({
				val: empty,
				activeSquare,
			})
		);
	};

	const hintHandler = () => {
		dispatch(
			puzzleActions.updateUserPuzzle({
				val: solvedString[activeSquare],
				activeSquare,
			})
		);
	};

	const undoHandler = () => {
		alert("Not yet implemented... :(");
	};

	const notesHandler = () => {
		alert("Not yet implemented... :(");
	};

	return (
		<div className={props.className}>
			<button className={buttonCss.button} onClick={undoHandler} disabled>
				<span className="material-icons">undo</span>
				Undo
			</button>
			<button className={buttonCss.button} onClick={notesHandler} disabled>
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
	);
};

export default InputTopRow;
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { uiActions } from "../../store/ui-slice";

import Switch from "../Switch";

const OptionsSwitches: React.FC<{
	className: string
}> = (props) => {
	const dispatch = useAppDispatch();

	const highlightActiveRowsAndCols = useAppSelector(
		(state) => state.ui.highlightActiveRowsAndCols
	);
	const highlightActiveSection = useAppSelector(
		(state) => state.ui.highlightActiveSection
	);
	const highlightSameValues = useAppSelector(
		(state) => state.ui.highlightSameValues
	);
	const highlightValidRowsAndCols = useAppSelector(
		(state) => state.ui.highlightValidRowsAndCols
	);
	const highlightValidSections = useAppSelector(
		(state) => state.ui.highlightValidSections
	);
	const showDarkTheme = useAppSelector(
		(state) => state.ui.showDarkTheme
	);

	const toggleHighlightActiveRowsAndCols = () => {
		dispatch(
			uiActions.setHighlightActiveRowsAndCols(!highlightActiveRowsAndCols)
		);
	};

	const toggleHighlightActiveSection = () => {
		dispatch(
			uiActions.setHighlightActiveSection(!highlightActiveSection)
		);
	};

	const toggleHighlightValidRowsAndCols = () => {
		dispatch(
			uiActions.setHighlightValidRowsAndCols(!highlightValidRowsAndCols)
		);
	};

	const toggleHighlightValidSections = () => {
		dispatch(
			uiActions.setHighlightValidSections(!highlightValidSections)
		);
	};

	const toggleHighlightSameValues = () => {
		dispatch(
			uiActions.setHighlightSameValues(!highlightSameValues)
		);
	};

	const toggleDarkTheme = () => {
		dispatch(
			uiActions.setShowDarkTheme(!showDarkTheme)
		);
	};

	return (
		<div className={props.className}>
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
			<Switch
				label="Highlight same numbers"
				checked={highlightSameValues}
				onChange={toggleHighlightSameValues}
			/>
			<Switch
				label="Dark theme"
				checked={showDarkTheme}
				onChange={toggleDarkTheme}
			/>
		</div>
	);
};

export default OptionsSwitches
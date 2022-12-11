import classes from "./Controls.module.css";

import InputTopRow from "./Controls/InputTopRow";
import NumberInputs from "./Controls/NumberInputs";
import GameActions from "./Controls/GameActions";
import GameDifficultySelect from "./Controls/GameDifficultySelect";
import OptionsSwitches from "./Controls/OptionsSwitches";

import { useAppSelector } from "../store/hooks";

const Controls = () => {

	const showDifficultySelect = useAppSelector(
		(state) => state.ui.showDifficultySelect
	);

	return (
		<div className={classes.controls}>
			<div className={classes.col1}>
				<InputTopRow className={classes.topRow} />
				<NumberInputs className={classes.numbers} />
			</div>
			<div className={classes.col2}>
				<GameActions className={classes.gameActions} />
				{showDifficultySelect && (
					<GameDifficultySelect className={classes.difficultySelect} />
				)}
				<OptionsSwitches className={classes.switches} />
			</div>
		</div>
	);
};

export default Controls;

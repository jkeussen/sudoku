import classes from "./Controls.module.css";

import InputTopRow from "./Controls/InputTopRow";
import NumberInputs from "./Controls/NumberInputs";

const Controls = () => {
	return (
		<div className={classes.controls}>
			<NumberInputs className={classes.numbers} />
			<InputTopRow className={classes.topRow} />
		</div>
	);
};

export default Controls;

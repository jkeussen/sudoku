import NumberInputButton from "./NumberInputButton";

const NumberInputs: React.FC<{
	className: string;
}> = (props) => {
	const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

	return (
		<div className={props.className}>
			{nums.map((num) => {
				return <NumberInputButton key={`numberButton_${num}`} number={num} />;
			})}
		</div>
	);
};

export default NumberInputs;

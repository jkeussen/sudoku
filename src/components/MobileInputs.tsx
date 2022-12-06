import classes from './MobileInputs.module.css'

const MobileInputButton: React.FC<{
	value: number;
}> = (props) => {
	return(
		<button className={classes.inputBtn}>
			{props.value}
		</button>
	)
}

const MobileInputs: React.FC<{}> = (props?) => {
	const nums = [1,2,3,4,5,6,7,8,9]
	return(
		<div className={classes.mobileInputs}>
			{nums.map((num) => <MobileInputButton
				key={`mobileInputButton_${num}`}
				value={num}
			/>)}
		</div>
	)
}

export default MobileInputs
import React, { useState } from 'react'
import classes from './Tile.module.css'

const Tile: React.FC<{row: number, col: number, value: string}> = (props) => {
	
	const [userVal, setUserVal] = useState<string>('');

	const updateUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const enteredValue = e.nativeEvent.data
		if (!Number(enteredValue)) return;
		setUserVal(e.nativeEvent.data.split().pop())
	}
	
	if (props.value === '.') {
		return(<input
			className={classes.userTile}
			id={`${props.row}_${props.col}`}
			type="text"
			value={userVal}
			onChange={updateUserValue}
		/>)
	}
	return(
		<input 
			className={classes.setTile}
			id={`${props.row}_${props.col}`}
			type="text"
			value={props.value}
			onChange={() => {}}
		/>
	)
}

export default Tile
import classes from './Notes.module.css'

export type CandidateTileValues = {
	isPopulated: boolean,
	values: { 
		[key: number]: boolean 
	}
}

const Notes: React.FC<{
	tileId: number,
	candidateVals: CandidateTileValues
}> = (props) => {

	return(
		<div className={classes.notes}>
			<span>{props.candidateVals.values[1] ? '1' : ''}</span>
			<span>{props.candidateVals.values[2] ? '2' : ''}</span>
			<span>{props.candidateVals.values[3] ? '3' : ''}</span>
			<span>{props.candidateVals.values[4] ? '4' : ''}</span>
			<span>{props.candidateVals.values[5] ? '5' : ''}</span>
			<span>{props.candidateVals.values[6] ? '6' : ''}</span>
			<span>{props.candidateVals.values[7] ? '7' : ''}</span>
			<span>{props.candidateVals.values[8] ? '8' : ''}</span>
			<span>{props.candidateVals.values[9] ? '9' : ''}</span>
		</div>
	)
}

export default Notes;
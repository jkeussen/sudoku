import classes from './Switch.module.scss'

const Switch: React.FC<{
	label: string;
	checked: boolean;
	onChange: any;
}> = (props) => {
	return(
	<div className={classes.toggle}>
		<label className={classes.switchWrap}>
			<input type="checkbox" checked={props.checked} onChange={props.onChange}/>
			<div className={classes.switch}></div>
		</label>
		<span>{props.label}</span>
	</div>
	)
}

export default Switch;
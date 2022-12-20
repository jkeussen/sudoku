import classes from './Footer.module.css'

const Footer = () => {
	return(
		<div className={classes.footer}>
			<p>Created by <a href="https://github.com/borisboguslavsky" target="_blank">Boris Boguslavsky</a></p>
			{/* <p><a href="https://github.com/borisboguslavsky/sudoku" target="_blank">Github</a></p> */}
			<p>v1.1</p>
		</div>
	)
}

export default Footer;
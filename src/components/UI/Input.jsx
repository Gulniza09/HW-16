import classes from '../UI/Input.module.css'
const Input = (props) => {
	return (
		<div>
			<input className={classes.input}
				type={props.type}
				onChange={props.onChange}
				value={props.value}
				placeholder={props.placeholder}
			/>
		</div>
	)
}
export default Input

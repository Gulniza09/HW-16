import Input from './UI/Input'
import Button from './UI/Button'
import { useReducer } from 'react'
import { BASE_URL } from '../Helpers/constants'
import classes from './Login.module.css'

let nameValid = RegExp(/[0-9]/)
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)
const validatPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
const initialState = {
	userName: {
		value: '',
		isValid: false,
	},
	userEmail: {
		value: '',
		isValid: false,
	},
	userPassword: {
		value: '',
		isValid: false,
	},
}
function stateReduser(state, action) {
	switch (action.type) {
		case 'NAME_VALUE': {
			return {
				...state,
				userName: {
					value: action.value,
					isValid: nameValid.test(action.value),
				},
			}
		}
		case 'EMAIL_VALUE': {
			return {
				...state,
				userEmail: {
					value: action.value,
					isValid: validEmailRegex.test(action.value),
				},
			}
		}
		case 'PASSWORD_VALUE': {
			return {
				...state,
				userPassword: {
					value: action.value,
					isValid: validatPassword.test(action.value),
				},
			}
		}
		case 'CLEAR':
			return {
				...state,
				userName: {
					value: '',
				},
				userEmail: {
					value: '',
				},
				userPassword: {
					value: '',
				},
			}

		default:
			break
	}
	return initialState
}
const Login = () => {
	const [state, dispatchState] = useReducer(stateReduser, initialState)
	const nameChangeHandler = (event) => {
		dispatchState({ type: 'NAME_VALUE', value: event.target.value })
	}
	const emailChangeHandler = (event) => {
		dispatchState({ type: 'EMAIL_VALUE', value: event.target.value })
	}
	const passwordChangeHandler = (event) => {
		dispatchState({ type: 'PASSWORD_VALUE', value: event.target.value })
	}
	console.log(state)

	const submitUserInfoHandler = (event) => {
		event.preventDefault()
		const userInfo = {
			name: state.userName.value,
			email: state.userEmail.value,
			password: state.userPassword.value,
			id: Math.random().toString(),
		}
		dispatchState({ type: 'CLEAR' })
		console.log(userInfo)

		async function addUserInfo() {
			const response = await fetch(BASE_URL, {
				method: 'POST',
				body: JSON.stringify(userInfo),
				headers: {
					'Content-type': 'application/json',
				},
			})
			const data = await response.json()
			console.log(data)
		}

		addUserInfo()
	}

	return (
		<div>
			<form className={classes.form} onSubmit={submitUserInfoHandler}>
				<h1 className={classes.h1}>Login Page</h1>
				<Input
					onChange={nameChangeHandler}
					type='text'
					placeholder='UserName'
					value={state.userName.value}
				/>
				<Input
					onChange={emailChangeHandler}
					type='email'
					placeholder='Email'
					value={state.userEmail.value}
				/>
				<Input
					onChange={passwordChangeHandler}
					type='password'
					placeholder='Password'
					value={state.userPassword.value}
				/>
				<Button type='submit'>Add</Button>
			</form>
		</div>
	)
}
export default Login

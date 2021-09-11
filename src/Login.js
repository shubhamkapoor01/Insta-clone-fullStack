import React from 'react'
import { auth, provider } from './Firebase/firebase'
import { Button } from '@material-ui/core'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
import './Login.css'

function Login() {
	const [{}, dispatch] = useStateValue();
	
  const signIn = () => {
		auth
		.signInWithPopup(provider)
		.then((result) => {
			dispatch({
				type: actionTypes.SET_USER,
				user: result.user,
			});
		})
			.catch((error) => {
			console.log(error.message)
		});
  };

	return (
		<div className="login">
			<div className="login__container">
				<div className="login__text">
					<h1> Sign in to Instagram </h1>
				</div>
				<Button onClick={ () => signIn(provider) }>
					Sign In With Google
				</Button>
			</div>
		</div>
	)
}

export default Login
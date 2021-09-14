import React from 'react'
import { auth, provider } from './Firebase/firebase'
import { Button } from '@material-ui/core'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
import firebase from 'firebase/compat/app'
import './Login.css'

function Login() {
	const [{}, dispatch] = useStateValue();
	
  const signIn = () => {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.then(async () => {
    	return firebase.auth().signInWithPopup(provider).then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
  	})
  	.catch((error) => {
			console.log(error)
  	});
};

	return (
		<div className="login">
			<div className="login__container">
				<div className="login__text">
					Log In to Instagram 
				</div>
				<Button className="login__button" onClick={ () => signIn(provider) }>
					Sign In With Google
				</Button>
			</div>
		</div>
	)
}

export default Login
import React, { useState, useEffect } from 'react'
import './Header.css'
import { useStateValue } from '../../StateProvider'
import db from '../../Firebase/firebase'
import { actionTypes } from '../../reducer'
import Popup from 'reactjs-popup'

function Header() {
	const [{ user }] = useStateValue();
	const [{ clicked }] = useStateValue();
	const [{ users }, dispatch] = useStateValue();
	const [searching, setSearching] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			const data = await db.collection('posts').get();
			dispatch({
				type: actionTypes.ADD_POST,
				posts: data.docs.map(doc => doc.data()),
			})
		}
		const fetchUsers = async () => {
			const data = await db.collection('users').get();
			dispatch({
				type: actionTypes.ADD_USER,
				users: data.docs.map(doc => doc.data()), 
			})
		}
		const addUser = async () => {
			if (db.collection("users").doc(user.email).exists) {
				return;
			}
			var newUser = { 
				name: user.displayName,
				email: user.email,
				messaged: [], 
				followed: [],
				liked: [],
				posted: [],
			};
			db.collection("users").doc(user.email).set({
				name: newUser.name,
				email: newUser.email,
				messaged: newUser.messaged, 
				followed: newUser.followed,
				liked: newUser.liked,
				posted: newUser.posted,
			});
			dispatch({
				type: actionTypes.ADD_USER,
				users: [...users, newUser],
			});
		}

		fetchPosts();
		fetchUsers();
		addUser();
	}, [])

	const visitUser = (clickedEmail) => {
		dispatch({
			type: actionTypes.SET_CLICKED,
			clicked: clickedEmail,
		})
		window.open(`/${ clickedEmail }`, "_self")
	}



	return (
		<div className="header">
			<a className="header__logo" href=".">
				Instagram
			</a>
			<Popup trigger={
				<input className="header__searchbar" 
					placeholder="Search for someone..."
					onChange={ (e) => setSearching(e.target.value) }
				/>
			} position="bottom center" closeOnDocumentClick>
				<div className="search__popup">
					{ 
						users.map((user) => {
							return(
								user.name.toLowerCase().startsWith(searching.toLocaleLowerCase()) ? (
										<div className="search__result" onClick={ (e) => visitUser(user.email) }>
											{ user.name }
										</div>
								) : (
									<div></div>
								)
							)
						})
					}
				</div>
			</Popup>
			<div className="header__right">
				<a className="header__home" href=".">
					Home
				</a>
				<a className="header__myProfile" href={`/${user.email}`}>
					My Profile
				</a>	
			</div>
		</div>
	)
}

export default Header
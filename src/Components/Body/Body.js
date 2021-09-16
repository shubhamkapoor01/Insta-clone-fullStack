import React, { useEffect, useState } from 'react'
import './Body.css'
import AddPost from './AddPost/AddPost'
import Posts from './Posts/Posts'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'
import db from '../../Firebase/firebase'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MyPosts from './MyPosts/MyPosts'

function Body() {
	const [{ user }] = useStateValue();
	const [{ users }] = useStateValue();
	const [{ clicked }] = useStateValue();
	const [{ posts }, dispatch] = useStateValue();
	
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
				following: [],
				followers: [],
				liked: [],
				posted: [],
				profilePicture: "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
			};
			db.collection("users").doc(user.email).set({
				name: newUser.name,
				email: newUser.email,
				messaged: newUser.messaged, 
				following: newUser.following,
				followers: newUser.followers,
				liked: newUser.liked,
				posted: newUser.posted,
				profilePicture: newUser.profilePicture,
			});
			dispatch({
				type: actionTypes.ADD_USER,
				users: [...users, newUser],
			});
		}

		fetchPosts();
		fetchUsers();
		addUser();
	}, []);

	return (
		<div className="body">
			<BrowserRouter>
				<AddPost />
				<Switch>              
					<Route exact path="/" component={ Posts } />
  				<Route exact path={`/${ user.email }`} component={ MyPosts } />
					<Route path="/" component={ MyPosts } />
   	  	</Switch>
			</BrowserRouter>
		</div>
	)
}

export default Body
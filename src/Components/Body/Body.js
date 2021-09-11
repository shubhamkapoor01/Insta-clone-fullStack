import React, { useEffect, useState } from 'react'
import './Body.css'
import AddPost from './AddPost/AddPost'
import Posts from './Posts/Posts'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'
import db from '../../Firebase/firebase'


function Body() {
	const [{ user }] = useStateValue();
	const [{ users }] = useStateValue();
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
				followed: [],
				liked: [],
			};
			db.collection("users").doc(user.email).set({
				name: newUser.name,
				email: newUser.email,
				messaged: newUser.messaged, 
				followed: newUser.followed,
				liked: newUser.liked,
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
			<AddPost />
			<Posts />
		</div>
	)
}

export default Body
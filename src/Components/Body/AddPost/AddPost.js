import React, { useState, useContext } from 'react'
import './AddPost.css'
import Popup from 'reactjs-popup'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import { useStateValue } from '../../../StateProvider'
import { actionTypes } from '../../../reducer'
import db from '../../../Firebase/firebase'

function AddPost() {
	const [{ user }] = useStateValue();
	const [{ posts }, dispatch] = useStateValue();
	const [image, setImage] = useState("");
	const [caption, setCaption] = useState("");

	const addPost = (e) => {
		e.preventDefault();
		if (image === "") {
			alert("Please add an image to post!");
			return;
		}
		var newPost = { 
			id: new Date().getTime().toString(), 
			authorName: user.displayName,
			authorEmail: user.email,
			image: image, 
			likes: 0,
			caption: caption, 
			comments: [],
			likedBy: [],
		};
		db.collection("posts").doc(newPost.id).set({
			id: newPost.id,
			authorName: newPost.authorName,
			authorEmail: newPost.authorEmail,
			likes: newPost.likes,
			image: newPost.image,
			caption: newPost.caption,
			comments: newPost.comments,
			likedBy: newPost.likedBy,
		});
		dispatch({
			type: actionTypes.ADD_POST,
			posts: [...posts, newPost],
		});
		return;
	}

	return (
		<div className="addpost">
			<Popup trigger={
					<AddCircleOutlinedIcon type="button" className="addpost__icon" fontSize="large" />
				} position="bottom center" >
				<div className="addpost__form">
					<input className="addpost__image"
						placeholder="Add Image URL..."
						onChange={ (e) => setImage(e.target.value) }
					/>
					<input className="addpost__caption"
						placeholder="Add a Caption..."
						onChange={ (e) => setCaption(e.target.value) }
					/>
					<button className="addpost__submit" onClick={ addPost }>
						Post
					</button>
				</div>
			</Popup>
		</div>
	)
}

export default AddPost
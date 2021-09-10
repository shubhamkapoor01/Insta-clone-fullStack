import React, { useState, useContext } from 'react'
import './AddPost.css'
import Popup from 'reactjs-popup'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import { Context } from '../../../Store'

function AddPost() {
	const [posts, setPosts] = useContext(Context);
	const [image, setImage] = useState("");
	const [caption, setCaption] = useState("");

	const addPost = (e) => {
		e.preventDefault();
		if (image === "") {
			alert("Please add an image to post!");
			return;
		}
		var newPost = { id: new Date().getTime().toString(), image: image, caption: caption, comments: [] };
		setPosts([...posts, newPost]);
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
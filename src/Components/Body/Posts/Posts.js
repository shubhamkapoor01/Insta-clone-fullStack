import React, { useState } from 'react'
import './Posts.css'
import { useStateValue } from '../../../StateProvider'
import db from '../../../Firebase/firebase'
import { actionTypes } from '../../../reducer'
import Popup from 'reactjs-popup'

function Posts() {
	const [{ user }] = useStateValue();
	const [{ posts }, dispatch] = useStateValue();
	const [userComment, setUserComment] = useState("");

	const addLike = async (post) => {
		let tempPost = post;
		let idx = posts.findIndex(curr => (curr.id === post.id));
		posts.splice(idx, 1);
		if (tempPost.likedBy.includes(user.email)) {
			const idx = tempPost.likedBy.indexOf(user.email)
			tempPost.likedBy.splice(idx, 1);
			tempPost.likes --;
			db.collection("posts").doc(tempPost.id).set({
				id: tempPost.id,
				authorName: tempPost.authorName,
				authorEmail: tempPost.authorEmail,
				likes: tempPost.likes,
				image: tempPost.image,
				caption: tempPost.caption,
				comments: tempPost.comments,
				likedBy: tempPost.likedBy,
			});	
		} else {
			tempPost.likes ++;
			tempPost.likedBy = [...tempPost.likedBy, user.email];
			db.collection("posts").doc(tempPost.id).set({
				id: tempPost.id,
				authorName: tempPost.authorName,
				authorEmail: tempPost.authorEmail,
				likes: tempPost.likes,
				image: tempPost.image,
				caption: tempPost.caption,
				comments: tempPost.comments,
				likedBy: tempPost.likedBy,
			});
		}
		posts.splice(idx, 0, tempPost);
		dispatch({
			type: actionTypes.ADD_POST,
			posts: posts,
		})
		return;
	}

	const addComment = (e, post) => {
		e.preventDefault();
		let tempPost = post;
		let idx = posts.findIndex((curr => (curr.id === post.id)));
		posts.splice(idx, 1);
		tempPost.comments.push(userComment);
		db.collection("posts").doc(tempPost.id).set({
			id: tempPost.id,
			authorName: tempPost.authorName,
			authorEmail: tempPost.authorEmail,
			likes: tempPost.likes,
			image: tempPost.image,
			caption: tempPost.caption,
			comments: tempPost.comments,
			likedBy: tempPost.likedBy,
		});
		setUserComment("");
		posts.splice(idx, 0, tempPost);
		dispatch({
			type: actionTypes.ADD_POST,
			posts: posts,
		})
	}

	return (
		<div className="posts">
			{ posts.map((post) => {
				return (
					<div className="post" key={ post.id }>
						<p className="post__author">
							{ post.authorName }
						</p>
						<img className="post__image" 
							src={ post.image } 
							alt="Could not load.. refresh to retry.">
						</img>
						<div className="post__footer">
							<div className="post__caption">
								{ post.caption }
							</div>
							<div className="button__div"> 
								<button onClick={ (e) => addLike(post) }>
									Likes: { post.likes }
								</button>
								<Popup trigger={
									<button>
										Comment
									</button>
								} position="bottom right" >
									<div className="comment__form">
										<input className="comment__value"
											placeholder="Add Comment Here..."
											onChange={ (e) => setUserComment(e.target.value) }
										/>
										<button className="comment__button" onClick={ (e) => addComment(e, post) }>
											Post
										</button>
									</div>
								</Popup>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Posts
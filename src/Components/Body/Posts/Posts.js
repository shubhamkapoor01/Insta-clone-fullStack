import React, { useState, useEffect } from 'react'
import './Posts.css'
import { useStateValue } from '../../../StateProvider'
import db from '../../../Firebase/firebase'
import { actionTypes } from '../../../reducer'
import Popup from 'reactjs-popup'

function Posts() {
	const [{ user }] = useStateValue();
	const [{ clicked }] = useStateValue();
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
		if (userComment === "") {
			alert("Please enter a valid comment")
			return;
		}
		let tempPost = post;
		let idx = posts.findIndex((curr => (curr.id === post.id)));
		posts.splice(idx, 1);
		tempPost.comments.push({ sender: user.displayName , value: userComment });
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
		posts.splice(idx, 0, tempPost);
		dispatch({
			type: actionTypes.ADD_POST,
			posts: posts,
		})
		setUserComment("");
		e.target.value = "";
	}

	const setClicked = (clickedEmail) => {
		console.log(clickedEmail)
		dispatch({
			type: actionTypes.SET_CLICKED,
			clicked: clickedEmail,
		})
	}

	return (
		<div className="posts">
			{ posts.map((post) => {
				return (
					<div className="post" key={ post.id }>
						<a className="post__author" href={`/${ post.authorEmail }`} onClick={ (e) => setClicked(post.authorEmail) }>
							{ post.authorName }
						</a>
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
										{ 
											post.comments.map((comment) => {
												return (
													<div className="comment">
														<div className="comment__sender">
															{ comment.sender }: 
														</div>
														<div className="comment__value">
															{ comment.value }
														</div>
													</div>
												)
											})
										}
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
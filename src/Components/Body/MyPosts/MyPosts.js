import React, { useState, useEffect } from 'react'
import './MyPosts.css'
import { useStateValue } from '../../../StateProvider'
import db from '../../../Firebase/firebase'
import { actionTypes } from '../../../reducer'
import Popup from 'reactjs-popup'
import { useLocation } from 'react-router-dom'

function MyPosts() {
	const [{ user }] = useStateValue();
	const [{ users }, dispatch] = useStateValue();
	const [{ clicked }] = useStateValue();
	const [picture, setPicture] = useState("");
	const [followed, setFollowed] = useState(false);
	const [{ posts }] = useStateValue();
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
		tempPost.comments.push({ sender: user.displayName, value: userComment });
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
		e.target.value = "";
		posts.splice(idx, 0, tempPost);
		dispatch({
			type: actionTypes.ADD_POST,
			posts: posts,
		})
	}

	const GetEmail = () => {
		return useLocation().pathname.slice(1);	
	}

	const setFollow = async (senderEmail, recieverEmail) => {
		const idxSender = users.findIndex(curr => curr.email === senderEmail)
		const idxReciever = users.findIndex(curr => curr.email === recieverEmail)
		let newSender = users[idxSender]
		let newReciever = users[idxReciever]

		if (newReciever.followers.includes(senderEmail)) {
			newSender.following.splice(newSender.following.findIndex(curr => curr.email === recieverEmail), 1)
			newReciever.followers.splice(newReciever.followers.findIndex(curr => curr.email === senderEmail), 1)
		} else {
			newSender.following.push(recieverEmail)
			newReciever.followers.push(senderEmail)
		}
		db.collection('users').doc(senderEmail).set({
			email: newSender.email, 
			followers: newSender.followers,
			following:newSender.following,
			liked: newSender.liked,
			messaged: newSender.messaged,
			name: newSender.name,
			posted: newSender.posted,
			profilePicture: newSender.profilePicture,
		})
		db.collection('users').doc(recieverEmail).set({
			email: newReciever.email,
			followers: newReciever.followers,
			following: newReciever.following,
			liked: newReciever.liked,
			messaged: newReciever.messaged,
			name: newReciever.name,
			posted: newReciever.posted,
			profilePicture: newReciever.profilePicture,
		})
		
		users[idxSender] = newSender;
		users[idxReciever] = newReciever;
		dispatch({
			actionTypes: actionTypes.ADD_USER,
			users: users,
		})
		if (!followed) {
			setFollowed(true)
		} else {
			setFollowed(false)
		}
	}

	const updatePic = (e, curr) => {
		const userIdx = users.findIndex(x => curr.email === x.email);
		if (user.email !== curr.email) {
			alert("You can only edit your profile picture!");
			return;
		}
		curr.profilePicture = picture;
		users[userIdx] = curr;
		db.collection('users').doc(curr.email).set({
			email: curr.email,
			followers: curr.followers,
			following: curr.following,
			liked: curr.liked,
			messaged: curr.messaged,
			name: curr.name,
			posted: curr.posted,
			profilePicture: curr.profilePicture,
		})
		dispatch({
			type: actionTypes.ADD_USER,
			users: users,
		})
		setPicture("");
		e.target.value = "";
		return;
	}

	return (
		<div className="myProfile">
			{ users.map((current) => {
				return (
					current.email === GetEmail() ? (
						<div className="profile">
							<div className="pic__name">
								<Popup trigger={
									<img className="profile__pic" src={ current.profilePicture } />
								} position="bottom center" >
									<div className="comment__form">
										<input className="comment__value"
											placeholder="Add New Image Here..."
											onChange={ (e) => setPicture(e.target.value) }
										/>
										<button className="comment__button" onClick={ (e) => updatePic(e, current) }>
											Update
										</button>
									</div>
								</Popup>
							</div>	
							<div className="profile__right">
								<div className="profile__name">
									{ current.name }
								</div>
								<div className="profile__down">
									<div className="profile__info">
										{ current.following.length - 1 } Following 
										</div>
									<div className="profile__info">
										{ current.followers.length - 1 } Followers
									</div>
								</div>
							</div>
							<div className="profile__follow">
								{ current.email === user.email ? (
									<div></div>
								) : (
									<div className="follow">
										<button className="follow__button" onClick={ (e) => setFollow(user.email, current.email) }>
											{ current.followers.indexOf(user.email) > -1 ? (
													<div> unfollow </div>
												) : (
													<div> follow </div>
												)
											}
										</button>
									</div>
								) }
							</div>
						</div>
					) : (
						<div></div>
					)
				)
			})
			}
			<div className="posts">
				{
					posts.map((post) => {
						return (
						post.authorEmail === GetEmail() ? (
							<div className="post" key={ post.id }>
							<a className="post__author" href={`/${ user.email }`}>
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
						) : (
							<div className="no__posts">
							</div>
						)
					)})
				}
			</div>			
		</div>
	)
}

export default MyPosts
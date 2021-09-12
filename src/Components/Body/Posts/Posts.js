import React, { useState } from 'react'
import './Posts.css'
import { useStateValue } from '../../../StateProvider'
import db from '../../../Firebase/firebase'
import { render } from '@testing-library/react';

function Posts() {
	const [{ user }] = useStateValue();
	const [{ users }] = useStateValue();
	const [{ posts }, dispatch] = useStateValue();

	const addLike = async (post) => {
		if (post.likedBy.includes(user.email)) {
			const idx = post.likedBy.indexOf(user.email)
			post.likedBy.splice(idx, 1);
			post.likes --;
			db.collection("posts").doc(post.id).set({
				id: post.id,
				authorName: post.authorName,
				authorEmail: post.authorEmail,
				likes: post.likes,
				image: post.image,
				caption: post.caption,
				comments: post.comments,
				likedBy: post.likedBy,
			});
		} else {
			post.likes ++;
			post.likedBy = [...post.likedBy, user.email];
			db.collection("posts").doc(post.id).set({
				id: post.id,
				authorName: post.authorName,
				authorEmail: post.authorEmail,
				likes: post.likes,
				image: post.image,
				caption: post.caption,
				comments: post.comments,
				likedBy: post.likedBy,
			});
		}
		render();
		return;
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
								<button className="post__likes" onClick={ (e) => addLike(post) }>
									Likes: { post.likes }
								</button>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Posts
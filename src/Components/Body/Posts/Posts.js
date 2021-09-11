import React, { useContext } from 'react'
import './Posts.css'
import { useStateValue } from '../../../StateProvider'

function Posts() {
	const [{ posts }, dispatch] = useStateValue();
	
	return (
		<div className="posts">
			{ posts.map((post) => {
				console.log(post);
				return (
					<a className="post" href="." key={ post.id }>
						<img className="post__image" 
							src={ post.image } 
							alt="Could not load.. refresh to retry.">
						</img>
						<p className="post__caption">
							{ post.caption }
						</p>
					</a>
				)
			})}
		</div>
	)
}

export default Posts

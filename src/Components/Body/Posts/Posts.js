import React from 'react'
import './Posts.css'
import { useStateValue } from '../../../StateProvider'

function Posts() {
	const [{ posts }, dispatch] = useStateValue();

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
						<p className="post__caption">
							{ post.caption }
						</p>
					</div>
				)
			})}
		</div>
	)
}

export default Posts
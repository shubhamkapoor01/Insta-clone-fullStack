import React from 'react'
import './Body.css'
import AddPost from './AddPost/AddPost'
import Posts from './Posts/Posts'

function Body() {
	return (
		<div className="body">
			<AddPost />
			<Posts />
		</div>
	)
}

export default Body
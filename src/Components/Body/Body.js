import React from 'react'
import './Body.css'
import AddPost from './AddPost/AddPost'
import Posts from './Posts/Posts'
import Store from '../../Store'

function Body() {
	return (
		<Store>
			<div className="body">
				<AddPost />
				<Posts />
			</div>
		</Store>
	)
}

export default Body
import React, { useState } from 'react'

export const Context = React.createContext();

const Store = ({ children }) => {
	const [posts, setPosts] = useState([]);

	return (
		<Context.Provider value={[posts, setPosts]}>{children}</Context.Provider>
	)
}

export default Store;
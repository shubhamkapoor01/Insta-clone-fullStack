import React from 'react'
import './Header.css'
import { useStateValue } from '../../StateProvider'

function Header() {
	const [{ user }] = useStateValue();

	return (
		<div className="header">
			<a className="header__logo" href=".">
				Instagram
			</a>
			<div className="header__right">
				<a className="header__home" href=".">
					Home
				</a>
				<a className="header__myProfile" href={`/${user.displayName}`}>
					My Profile
				</a>	
			</div>
		</div>
	)
}

export default Header
import React from 'react'
import './Header.css'


function Header() {
	return (
		<div className="header">
			<a className="header__logo" href=".">
				Instagram
			</a>
			<div className="header__right">
				<a className="header__home" href=".">
					Home
				</a>
				<a className="header__myProfile" href=".">
					My Profile
				</a>	
			</div>
		</div>
	)
}

export default Header
import React, { useState, useEffect } from 'react'
import './Chats.css'
import { useStateValue } from '../../../StateProvider'
import { current } from '@reduxjs/toolkit';
import db from '../../../Firebase/firebase';

function Chats() {
	const [{ user }] = useStateValue();
	const [{ users }, dispatch] = useStateValue();
	const [current, setCurrent] = useState({});
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		for (let i = 0; i < users.length; i ++) {
			if (users[i].following.includes(user.email) || users[i].followers.includes(user.email)) {
				setCurrent(users[i])
				break;
			}
		}
	}, [users])

	useEffect(() => {
		let temp = [];
		let key;
		if (user.email < current.email) {
			key = user.email + " " + current.email;
		} else {
			key = current.email + " " + user.email;
		}	
		db.collection('chats').doc(key).onSnapshot(snapshot => {
			if (snapshot.exists) {
				setMessages(snapshot.data().messages);
			}
		});
	}, [current])

	const sendMessage = (e) => {
		e.preventDefault();
		if (message === "") {
			alert("Please enter a valid message...");
			return;
		}
		var temp = { sender: user.email, reciever: current.email, value: message }
		let key;
		if (user.email < current.email) {
			key = user.email + " " + current.email;
		} else {
			key = current.email + " " + user.email;
		}		
		db.collection('chats').doc(key).set({
			messages: [...messages, temp],
		})
		setMessages([...messages, temp]);
		document.getElementById("chatbox__footer__input").value = "";
		setMessage("");
		return;
	}

	return (
		<div className="chats">
			<div className="chatbar">
				{ users.map((curr) => {
					return(
						curr.following.includes(user.email) || curr.followers.includes(user.email) ? (
							<div className="chatbar__item" onClick={ (e) => setCurrent(curr) }>
								<img className="user__dp" src={ curr.profilePicture } onClick={ (e) => { window.open(`/${ curr.email }`, "_self") } }/>
								<div className="user__name">
									{ curr.name }
								</div>
							</div>
						) : (
							<div></div>
						)
					)
				})
				}
			</div>
			<div className="chatbox">
				<div className="chatbox__header">
					<div className="chatbox__header__name">
						{ current.name }
					</div>
				</div>
				<div className="chatbox__body">
					{ messages.map((message) => {
						return (
							message.sender === user.email ? (
								<div className="message__send__div">
									<div className="message__send">
										{ message.value }
									</div>
								</div>
							) : (
								<div className="message__recieved">
									{ message.value }
								</div>
							)
						)
					})
					}
				</div>
				<div className="chatbox__footer">
					<input className="chatbox__footer__input"
						id="chatbox__footer__input"
						placeholder="Type Message Here..."
						onChange={ (e) => setMessage(e.target.value) }
					/>
					<button className="chatbox__footer__send" onClick={ (e) => sendMessage(e) }>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chats

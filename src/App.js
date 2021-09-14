import './App.css'
import React, { useState, useEffect } from 'react'
import Header from './Components/Header/Header'
import Body from './Components/Body/Body'
import Footer from './Components/Footer/Footer'
import Login from './Login'
import { useStateValue } from './StateProvider'
import firebase from 'firebase/compat/app'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {
        firebase.auth().onAuthStateChanged(() => {
          if (user) {
            setLoggedIn(true);
          }
        })
      }
      {
        loggedIn ? (
          <div className="app__body">
            <Header />
            <Body />
            <Footer />
          </div>
        ) : (
          <Login />
        )
      }
    </div>  
  );
}

export default App
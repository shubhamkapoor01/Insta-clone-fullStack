import './App.css'
import React from 'react'
import Header from './Components/Header/Header'
import Body from './Components/Body/Body'
import Footer from './Components/Footer/Footer'
import Login from './Login'
import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      { 
        !user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Header />
            <Body />
            <Footer />
          </div>
        )
      }
    </div>  
  );
}

export default App
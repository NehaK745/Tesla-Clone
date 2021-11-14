import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Menu from './Components/Menu/Menu'
import HeaderBlock from './Components/HeaderBlock/HeaderBlock'
import Login from './Components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import Signup from './Components/Signup/Signup'
import TeslaAccount from './Components/TeslaAccount/TeslaAccount'
import { auth } from './firebase'

function App() {
  const user = useSelector(selectUser)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        )
      } else {
        // User is signed out
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && <Menu />}
            <HeaderBlock />
          </Route>
          <Route exact path='/login'>
            {user ? <Redirect to='/teslaaccount' /> : <Login />}
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/teslaaccount'>
            {!user ? (
              <Redirect to='/login' />
            ) : (
              <>
                <TeslaAccount
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && <Menu />}
              </>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { useAppDispatch, thunkActions } from 'state'
import Home from 'views/Home'
import NavBar from 'views/NavBar'
import SignIn from 'views/SignIn'
import SignUp from 'views/SignUp'
import ForgotPassWord from 'views/ForgotPassWord'
import Setting from 'views/Setting'
import UserSetting from './UserSetting'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const establishSession = useCallback(
    () => dispatch(thunkActions.auth.establishSession()), [dispatch]
  )

  useEffect(() => {
    establishSession()
    console.log("establish session")
  }, [establishSession])

  return (
    <BrowserRouter>
      <Route path='/'><NavBar/> </Route>
      <Route exact path='/'><Home/> </Route>

      <Route path='/signin'><SignIn/></Route>
      <Route path='/signup'><SignUp/></Route>
      <Route path='/forgot-password'><ForgotPassWord/></Route>
      <Route path='/setting'><Setting/></Route>
      <Route path='/setting/user'><UserSetting/></Route>
    </BrowserRouter>
  )
}

export default App

import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Container } from '@material-ui/core'

import { useAppDispatch, thunkActions } from 'state'
import { useSignIn } from 'utils'
import Views from 'views'

const App: React.FC = () => {
  const navigate = createBrowserHistory()
  const dispatch = useAppDispatch()
  const establishSession = useCallback(
    () => dispatch(thunkActions.auth.establishSession()), [dispatch]
  )

  const signIn = useSignIn()

  useEffect(() => {
    if (process.env.REACT_APP_TRACKING_ID) {
      navigate.listen((location: any) => {
        window.gtag('config', `${process.env.REACT_APP_TRACKING_ID}`, {
          'page_path': `${location.pathname}${location.search}`
        })
      })
    }
    establishSession()
  }, [establishSession, navigate])

  return (
    <BrowserRouter>
      <Views.NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Views.Home />} />
          <Route path='/signin' element={signIn ? <Navigate to='/' /> : <Views.SignIn />} />
          <Route path='/signup' element={signIn ? <Navigate to='/' /> : <Views.SignUp />} />
          <Route path='/forgot-password' element={signIn ? <Navigate to='/' /> : <Views.ForgotPassWord />} />
          <Route path='/user' element={signIn ? <Views.Setting /> : <Views.NotFound />} />
          <Route path='/user/change-userinfo' element={signIn ? <Views.ChangeUserInfo /> : <Views.NotFound />} />
          <Route path='/user/change-email' element={signIn ? <Views.ChangeEmailForm /> : <Views.NotFound />} />
          <Route path='/user/change-password' element={signIn ? <Views.ChangePassWord /> : <Views.NotFound />} />
          <Route path='/user/delete' element={signIn ? <Views.DeleteUser /> : <Views.NotFound />} />
          <Route path='/games' element={signIn ? <Views.GameList /> : <Views.NotFound />} />
          <Route path='/games/new' element={signIn ? <Views.GameNew /> : <Views.NotFound />} />
          <Route path='/games/edit/:id' element={signIn ? <Views.GameEdit /> : <Views.NotFound />} />
          <Route path='/games/:id' element={<Views.GamePlay />} />
          <Route path='/terms' element={<Views.Terms />} />
          <Route path='/help' element={<Views.Help />} />
          <Route element={<Views.NotFound />}  />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
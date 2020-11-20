import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Container } from '@material-ui/core'

import { useAppDispatch, thunkActions } from 'state'
import Views from 'views'

const App: React.FC = () => {
  const history = createBrowserHistory()
  const dispatch = useAppDispatch()
  const establishSession = useCallback(
    () => dispatch(thunkActions.auth.establishSession()), [dispatch]
  )

  useEffect(() => {
    if (process.env.REACT_APP_TRACKING_ID) {
      history.listen((location: any) => {
        window.gtag('config', `${process.env.REACT_APP_TRACKING_ID}`, {
          'page_path': `${location.pathname}${location.search}`
        })
      })
    }
    establishSession()
  }, [establishSession, history])

  return (
    <BrowserRouter>
      <Container>
        <Route path='/'><Views.NavBar /></Route>
        <Switch>
          <Route exact path='/'><Views.Home /></Route>
          <Route path='/signin'><Views.SignIn /></Route>
          <Route path='/signup'><Views.SignUp /></Route>
          <Route path='/forgot-password'><Views.ForgotPassWord /></Route>
          <Route exact path='/user'><Views.Setting /></Route>
          <Route path='/user/change-userinfo'><Views.ChangeUserInfo /></Route>
          <Route path='/user/change-email'><Views.ChangeEmailForm /></Route>
          <Route path='/user/change-password'><Views.ChangePassWord /></Route>
          <Route path='/user/delete'><Views.DeleteUser /></Route>
          <Route exact path='/games'><Views.GameList /></Route>
          <Route path='/games/new'><Views.GameNew /></Route>
          <Route path='/games/edit/:id'><Views.GameEdit /></Route>
          <Route path='/games/:id'><Views.GamePlay /></Route>
          <Route path='/terms'><Views.Terms /></Route>
          <Route path='/help'><Views.Help /></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
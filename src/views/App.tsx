import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Container } from '@material-ui/core'

import { useAppDispatch, thunkActions } from 'state'
import { useSignIn } from 'utils'
import Views from 'views'

const App: React.FC = () => {
  const history = createBrowserHistory()
  const dispatch = useAppDispatch()
  const establishSession = useCallback(
    () => dispatch(thunkActions.auth.establishSession()), [dispatch]
  )

  const singIn = useSignIn()

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
          {singIn && <Route exact path='/user'><Views.Setting /></Route>}
          {singIn && <Route path='/user/change-userinfo'><Views.ChangeUserInfo /></Route>}
          {singIn && <Route path='/user/change-email'><Views.ChangeEmailForm /></Route>}
          {singIn && <Route path='/user/change-password'><Views.ChangePassWord /></Route>}
          {singIn && <Route path='/user/delete'><Views.DeleteUser /></Route>}
          {singIn && <Route exact path='/games'><Views.GameList /></Route>}
          {singIn && <Route path='/games/new'><Views.GameNew /></Route>}
          {singIn && <Route path='/games/edit/:id'><Views.GameEdit /></Route>}
          <Route path='/games/:id'><Views.GamePlay /></Route>
          <Route path='/terms'><Views.Terms /></Route>
          <Route path='/help'><Views.Help /></Route>
          <Route render={() => <Views.NotFound />} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
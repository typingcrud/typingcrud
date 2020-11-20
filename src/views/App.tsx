import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
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

  const signIn = useSignIn()

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
          <Route path='/signin'>{signIn ? <Redirect to='/' /> : <Views.SignIn />}</Route>
          <Route path='/signup'>{signIn ? <Redirect to='/' /> : <Views.SignUp />}</Route>
          <Route path='/forgot-password'>{signIn ? <Redirect to='/' /> : <Views.ForgotPassWord />}</Route>
          <Route exact path='/user'>{signIn ? <Views.Setting /> : <Views.NotFound />}</Route>
          <Route path='/user/change-userinfo'>{signIn ? <Views.ChangeUserInfo /> : <Views.NotFound />}</Route>
          <Route path='/user/change-email'>{signIn ? <Views.ChangeEmailForm /> : <Views.NotFound />}</Route>
          <Route path='/user/change-password'>{signIn ? <Views.ChangePassWord /> : <Views.NotFound />}</Route>
          <Route path='/user/delete'>{signIn ? <Views.DeleteUser /> : <Views.NotFound />}</Route>
          <Route exact path='/games'>{signIn ? <Views.GameList /> : <Views.NotFound />}</Route>
          <Route path='/games/new'>{signIn ? <Views.GameNew /> : <Views.NotFound />}</Route>
          <Route path='/games/edit/:id'>{signIn ? <Views.GameEdit /> : <Views.NotFound />}</Route>
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
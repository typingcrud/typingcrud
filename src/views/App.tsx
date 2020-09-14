import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { useAppDispatch, thunkActions } from 'state'
import Views from 'views'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const establishSession = useCallback(
    () => dispatch(thunkActions.auth.establishSession()), [dispatch]
  )

  useEffect(() => {
    establishSession()
  }, [establishSession])

  return (
    <BrowserRouter>
      <Route path='/'><Views.NavBar/></Route>
      <Route exact path='/'><Views.Home/></Route>
      <Route exact path='/user'><Views.Setting/></Route>
      <Route path='/user/signin'><Views.SignIn/></Route>
      <Route path='/user/signup'><Views.SignUp/></Route>
      <Route path='/user/change-password'><Views.ChangePassWord /></Route>
      <Route path='/user/forgot-password'><Views.ForgotPassWord /></Route>
      <Route path='/user/change-email'><Views.ChangeEmailForm/></Route>
      <Route path='/user/delete'><Views.UserSetting /></Route>
      <Route path='/demo'><Views.Demo /></Route> {/*いずれ削除*/}
      <Route path='/game'><Views.Game/></Route>
      <Route path='/game/post'><Views.GameForm/></Route>
      <Route path='/game/list'><Views.GameList/></Route>
      <Route path='/game/play/:index'><Views.GamePlay/></Route>
      <Route path='/terms'><Views.Terms/></Route> {/*//規約ページ*/}
      <Route path='/help'><Views.Help/></Route> {/*お問い合わせページ*/}
    </BrowserRouter>
  )
}

export default App

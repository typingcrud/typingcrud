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
      <Route path='/user'><Views.Setting/></Route>
      <Route path='/signin'><Views.SignIn/></Route>
      <Route path='/signup'><Views.SignUp/></Route>
      <Route path='/forgot-password'><Views.ForgotPassWord/></Route>
      <Route path='/demo'><Views.Demo /></Route> {/*いずれ削除*/}
      <Route path='/game'><Views.Game/></Route>
      <Route path='/game/post'><Views.GameForm/></Route>
      <Route path='/game/list'><Views.GameList/></Route>
      <Route path='/game/play/:id'><Views.GamePlay/></Route>
      <Route path='/terms'><Views.Terms/></Route> {/*//規約ページ*/}
      <Route path='/inquiry'><Views.Inquiry/></Route> {/*お問い合わせページ*/}
    </BrowserRouter>
  )
}

export default App

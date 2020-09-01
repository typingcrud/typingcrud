import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { useAppDispatch, thunkActions } from 'state'
import Home from 'views/Home'
import NavBar from 'views/NavBar'
import SignIn from 'views/SignIn'
import SignUp from 'views/SignUp'
import ForgotPassWord from 'views/ForgotPassWord'
import Setting from 'views/Setting'
import Demo from './Demo'
import Game from './Game'
import GameForm from './Game/GameForm'
import GameList from './Game/GameList'
import GamePlay from './Game/GamePlay'
import GameSetting from './Game/GameSetting'
import Terms from 'views/Terms'
import Inquiry from 'views/Inquiry'

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
      <Route path='/'><NavBar/> </Route>
      <Route exact path='/'><Home/> </Route>

      <Route path='/user'><Setting/></Route>
      <Route path='/signin'><SignIn/></Route>
      <Route path='/signup'><SignUp/></Route>
      <Route path='/forgot-password'><ForgotPassWord/></Route>
      <Route path='/demo'><Demo /></Route> {/*いずれ削除*/}
      <Route path='/game'><Game/></Route>
      <Route path='/game/post'><GameForm/></Route>
      <Route path='/game/list'><GameList/></Route>
      <Route path='/game/play'><GamePlay/></Route> {/*querystringでgameのindexをつける*/}
      <Route path='/game/setting'><GameSetting/></Route>
      <Route path='/terms'><Terms/></Route> {/*//規約ページ*/}
      <Route path='/inquiry'><Inquiry/></Route> {/*お問い合わせページ*/}
    </BrowserRouter>
  )
}

export default App

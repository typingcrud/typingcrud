import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { useAppDispatch, thunkActions } from 'state'
import Home from 'views/Home'
import NavBar from 'views/NavBar'
import SignIn from 'views/SignIn'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleEstablishSessionThunk = useCallback(
    () => dispatch(thunkActions.auth.establishSessionThunk()), [dispatch]
  )

  useEffect(() => {
    handleEstablishSessionThunk()
  }, [handleEstablishSessionThunk])

  return (
    <BrowserRouter>
      <Route path='/'>
        <NavBar/>
      </Route>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path='/signin'><SignIn/></Route>
    </BrowserRouter>
  )
}

export default App

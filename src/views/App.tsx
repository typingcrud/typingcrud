import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'views/Home'
import NavBar from 'views/NavBar'
import SignIn from 'views/SignIn'

const App: React.FC = () => {
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

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'views/Home'
import NavBar from './NavBar'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/'>
        <NavBar/>
      </Route>
      <Route exact path='/'>
        <Home/>
      </Route>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAppSelector } from 'state'
import { SignedIn } from 'views/NavBar/SignedIn'
import { NotSignedIn } from 'views/NavBar/NotSignedIn'

const NavBar: React.FC = () => {
  const isSignIn = useAppSelector(state => state.auth.isSignIn)

  const history = useHistory()

  const link = (path: string) => () => {
    history.push(path)
  }

  return (
    <nav>
      <button onClick={link('/')}>Home</button>
      { isSignIn ? <SignedIn/> : <NotSignedIn/>}
    </nav>
  )
}

export default NavBar

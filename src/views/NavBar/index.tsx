import React from 'react'
import { useHistory } from 'react-router-dom'
import { SignedIn } from 'views/NavBar/SignedIn'
import { NotSignedIn } from 'views/NavBar/NotSignedIn'

const NavBar: React.FC = () => {
  const history = useHistory()

  const link = (path: string) => () => {
    history.push(path)
  }

  return (
    <nav>
      <button onClick={link('/')}>Home</button>
      { true ? <SignedIn/> : <NotSignedIn/>}
    </nav>
  )
}

export default NavBar

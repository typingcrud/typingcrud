import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useSignIn } from 'utils'
import { SignedIn } from 'views/NavBar/SignedIn'
import { NotSignedIn } from 'views/NavBar/NotSignedIn'

const NavBar: React.FC = () => {
  const signIn = useSignIn()
  const history = useHistory()

  const link = useCallback(
    (path: string) => () => {
      history.push(path)
    }, [history]
  )

  return (
    <nav>
      <button onClick={link('/')}>Home</button>
      <button onClick={link('/demo')}>Demo</button>
      <button onClick={link('/terms')}>規約</button>
      <button onClick={link('/inquiry')}>お問い合わせ</button>
      { signIn ? <SignedIn link={link}/> : <NotSignedIn link={link}/>}
    </nav>
  )
}

export default NavBar

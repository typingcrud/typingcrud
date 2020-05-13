import React from 'react'
import { useHistory } from 'react-router-dom'

export const NotSignedIn: React.FC = () => {
  const history = useHistory()

  const link = (path: string) => () => {
    history.push(path)
  }

  return (
    <React.Fragment>
      <button onClick={link('/signin')}>SignIn</button>
      <button onClick={link('/signup')}>SignUp</button>
    </React.Fragment>
  )
}

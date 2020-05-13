import React from 'react'
import { useHistory } from 'react-router-dom'

export const SignedIn: React.FC = () => {
  const history = useHistory()

  const link = (path: string) => () => {
    history.push(path)
  }

  return (
    <React.Fragment>
      <button onClick={link('/')}>SignOut</button>
      <button onClick={link('/setting')}>Setting</button>
    </React.Fragment>
  )
}

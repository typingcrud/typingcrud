import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const Setting: React.FC = () => {
  const history = useHistory()
  const link = useCallback(
    (path: string) => () => history.push(path), [history]
  )

  return (
    <div>
      <h1>Setting</h1>
      <button onClick={link('/setting/user')}>user</button>
      <button onClick={link('/setting/email')}>email</button>
      <button onClick={link('/setting/password')}>password</button>
    </div>
  )
}

export default Setting

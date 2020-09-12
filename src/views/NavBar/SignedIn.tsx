import React, { useCallback } from 'react'

import { useAppDispatch, thunkActions } from 'state'


type Props = {
  link: (path: string) => () => void
}

export const SignedIn: React.FC<Props> = ({link}) => {
  const dispatch = useAppDispatch()
  const signOut = useCallback(
    () => {
      dispatch(thunkActions.auth.signOut())
      link('/')()
    }, [dispatch, link]
  )

  return (
    <div>
      <button onClick={signOut}>SignOut</button>
      <button onClick={link('/user')}>Setting</button>
      <button onClick={link('/game')}>Game</button>
      <hr></hr>
    </div>
  )
}

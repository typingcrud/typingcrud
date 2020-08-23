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
    <React.Fragment>
      <div>
        <button onClick={signOut}>SignOut</button>
        <button onClick={link('/setting')}>Setting</button>
      </div>
      <div>
        <button onClick={link('/game-form')}>GameForm</button>
      </div>
    </React.Fragment>
  )
}

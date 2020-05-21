import React from 'react'

import { useAppDispatch, thunkActions } from 'state'


type Props = {
  link: (path: string) => () => void
}

export const SignedIn: React.FC<Props> = ({link}) => {
  const dispatch = useAppDispatch()
  const signOut = () => {
    dispatch(thunkActions.auth.signOutThunk())
    link('/')()
  }

  return (
    <React.Fragment>
      <button onClick={signOut}>SignOut</button>
      <button onClick={link('/setting')}>Setting</button>
    </React.Fragment>
  )
}

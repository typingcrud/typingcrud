import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


const SignIn: React.FC = () => {
  const history = useHistory()
  const link = (path: string) => () => history.push(path)

  const signInForm = useAppSelector(state => state.authForm.signInForm)

  const dispatch = useAppDispatch()
  type SignInForm = typeof signInForm
  const changeForm = useCallback(
    (signInForm: SignInForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.authForm.changeSignInForm({
        ...signInForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const signIn = useCallback(
    () => dispatch(thunkActions.auth.signIn()), [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.authForm.reset()) }
  }, [dispatch])

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <input
          type='text'
          id='email'
          placeholder='email'
          value={signInForm.email}
          onChange={changeForm(signInForm)}
        />
        <input
          type='text'
          id='password'
          placeholder='password'
          value={signInForm.password}
          onChange={changeForm(signInForm)}
        />
        <button onClick={signIn}>SignIn</button>
      </div>
      <button onClick={link('forgot-password')}>forgot password</button>
    </div>
  )
}

export default SignIn

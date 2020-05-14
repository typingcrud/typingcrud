import React, { useCallback, useEffect } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


const SignIn: React.FC = () => {
  const signInForm = useAppSelector(state => state.form.signInForm)

  const dispatch = useAppDispatch()
  type SignInForm = typeof signInForm
  const handleSetSignInForm = useCallback(
    (signInForm: SignInForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.form.setSignInForm({
        ...signInForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const handleSignInThunk = useCallback(
    () => dispatch(thunkActions.auth.signInThunk()), [dispatch]
  )

  useEffect(() => {
    return () => {
      dispatch(actions.form.setSignInForm({email: '', password: ''}))
    }
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
          onChange={handleSetSignInForm(signInForm)}
        />
        <input
          type='text'
          id='password'
          placeholder='password'
          value={signInForm.password}
          onChange={handleSetSignInForm(signInForm)}
        />
        <button onClick={handleSignInThunk}>SignIn</button>
      </div>
    </div>
  )
}

export default SignIn

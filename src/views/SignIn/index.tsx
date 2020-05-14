import React, { useCallback, useEffect } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


const SignIn: React.FC = () => {
  const signinForm = useAppSelector(state => state.form.signinForm)

  const dispatch = useAppDispatch()
  type SignInForm = typeof signinForm
  const handleSetSignInForm = useCallback(
    (signinForm: SignInForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.form.setSignInForm({
        ...signinForm,
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
          value={signinForm.email}
          onChange={handleSetSignInForm(signinForm)}
        />
        <input
          type='text'
          id='password'
          placeholder='password'
          value={signinForm.password}
          onChange={handleSetSignInForm(signinForm)}
        />
        <button onClick={handleSignInThunk}>SignIn</button>
      </div>
    </div>
  )
}

export default SignIn

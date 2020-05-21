import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const SignUpForm: React.FC = () => {
  const { isSignUpForm, ...signUpForm } = useAppSelector(state => state.authForm.signUpForm)

  const dispatch = useAppDispatch()
  const handleSetIsSignUpForm = useCallback(
    () => dispatch(actions.authForm.setIsSignUpForm(!isSignUpForm)),
    [dispatch, isSignUpForm]
  )
  const handleSetSignUpForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.authForm.setSignUpForm({
        ...signUpForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch, signUpForm]
  )
  const handleSignUpThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpThunk()), [dispatch]
  )

  return (
    <React.Fragment>
      <div>
        <h1>SignUp</h1>
        <input
          type="text"
          id="email"
          placeholder="email"
          value={signUpForm.email}
          onChange={handleSetSignUpForm}
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          value={signUpForm.password}
          onChange={handleSetSignUpForm}
        />
        <button onClick={handleSignUpThunk}>Sign Up</button>
      </div>
      <div>
        <button onClick={handleSetIsSignUpForm}>go to verify form</button>
      </div>
    </React.Fragment>
  )
}

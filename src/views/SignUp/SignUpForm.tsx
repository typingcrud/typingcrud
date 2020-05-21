import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const SignUpForm: React.FC = () => {
  const { isSignUpForm, ...signUpForm } = useAppSelector(state => state.authForm.signUpForm)

  const dispatch = useAppDispatch()
  type SignUpForm = typeof signUpForm
  const changeForm = useCallback(
    (signUpForm: SignUpForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.authForm.changeSignUpForm({
        ...signUpForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const signUpThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpThunk()), [dispatch]
  )

  return (
    <React.Fragment>
      <div>
        <input
          type="text"
          id="email"
          placeholder="email"
          value={signUpForm.email}
          onChange={changeForm(signUpForm)}
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          value={signUpForm.password}
          onChange={changeForm(signUpForm)}
        />
        <button onClick={signUpThunk}>sign up</button>
      </div>
    </React.Fragment>
  )
}

import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const VerificationForm: React.FC = () => {
  const { isSignUpForm, ...signUpForm } = useAppSelector(state => state.form.signUpForm)

  const dispatch = useAppDispatch()
  const handleSetIsSignUpForm = useCallback(
    () => dispatch(actions.form.setIsSignUpForm(!isSignUpForm)),
    [dispatch, isSignUpForm]
  )
  const handleSetSignUpForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.form.setSignUpForm({
        ...signUpForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch, signUpForm]
  )
  const handleSignUpVerifyThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpVerifyThunk()), [dispatch]
  )
  const handleSignUpResendCodeThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpResendCodeThunk()), [dispatch]
  )

  return (
    <React.Fragment>
      <div>
        <h1>Verification</h1>
        <input
          type="text"
          id="email"
          placeholder="email"
          value={signUpForm.email}
          onChange={handleSetSignUpForm}
        />
        <input
          type="text"
          id="verificationCode"
          placeholder="verification code"
          value={signUpForm.verificationCode}
          onChange={handleSetSignUpForm}
        />
        <button onClick={handleSignUpVerifyThunk}>verify</button>
      </div>
      <div>
        <button onClick={handleSetIsSignUpForm}> go to sign up form</button>
        <button onClick={handleSignUpResendCodeThunk}>resend verification code</button>
      </div>
    </React.Fragment>
  )
}

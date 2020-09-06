import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const VerificationForm: React.FC = () => {
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
  const signUpVerifyThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpVerify()), [dispatch]
  )
  const signUpResendCodeThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpResendCode()), [dispatch]
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
          id="verificationCode"
          placeholder="verification code"
          value={signUpForm.verificationCode}
          onChange={changeForm(signUpForm)}
        />
        <button onClick={signUpVerifyThunk}>verify</button>
      </div>
      <div>
        <button onClick={signUpResendCodeThunk}>resend verification code</button>
      </div>
    </React.Fragment>
  )
}

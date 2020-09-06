import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const NewPasswordForm: React.FC = () => {
  const { isSendEmailForm, ...forgotPassWordForm } = useAppSelector(state => state.authForm.forgotPasswordForm)

  const dispatch = useAppDispatch()
  type ForgotPassWordForm = typeof forgotPassWordForm
  const changeForm = useCallback(
    (forgotPassWordForm: ForgotPassWordForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.authForm.changeForgotPasswordForm({
        ...forgotPassWordForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const submitNewPasswordThunk = useCallback(
    () => dispatch(thunkActions.auth.submitNewPassword()), [dispatch]
  )

  return (
    <React.Fragment>
      <input
        type="text"
        id="email"
        placeholder="email"
        value={forgotPassWordForm.email}
        onChange={changeForm(forgotPassWordForm)}
      />
      <input
        type="text"
        id="newPassword"
        placeholder="newPassword"
        value={forgotPassWordForm.newPassword}
        onChange={changeForm(forgotPassWordForm)}
      />
      <input
        type="text"
        id="verificationCode"
        placeholder="verification code"
        value={forgotPassWordForm.verificationCode}
        onChange={changeForm(forgotPassWordForm)}
      />
      <button onClick={submitNewPasswordThunk}>submit new password</button>
    </React.Fragment>
  )
}

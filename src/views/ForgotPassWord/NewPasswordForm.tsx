import React, { useCallback } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'


export const NewPasswordForm: React.FC = () => {
  const { isSendEmailForm, ...forgotPassWordForm } = useAppSelector(state => state.authForm.forgotPasswordForm)

  const dispatch = useAppDispatch()
  type ForgotPassWordForm = typeof forgotPassWordForm
  const handleSetForgotPasswordFrom = useCallback(
    (forgotPassWordForm: ForgotPassWordForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.authForm.setForgotPasswordForm({
        ...forgotPassWordForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )

  return (
    <React.Fragment>
      <input
        type="text"
        id="newPassword"
        placeholder="newPassword"
        value={forgotPassWordForm.newPassword}
        onChange={handleSetForgotPasswordFrom(forgotPassWordForm)}
      />
      <input
        type="text"
        id="verificationCode"
        placeholder="verification code"
        value={forgotPassWordForm.verificationCode}
        onChange={handleSetForgotPasswordFrom(forgotPassWordForm)}
      />
    </React.Fragment>
  )
}

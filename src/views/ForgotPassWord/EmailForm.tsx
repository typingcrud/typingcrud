import React, { useCallback } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'


export const EmailForm: React.FC = () => {
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
        id="email"
        placeholder="email"
        value={forgotPassWordForm.email}
        onChange={handleSetForgotPasswordFrom(forgotPassWordForm)}
      />
    </React.Fragment>
  )
}

import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const EmailForm: React.FC = () => {
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
  const forgotPasswordThunk = useCallback(
    () => dispatch(thunkActions.auth.forgotPasswordThunk()), [dispatch]
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
      <button onClick={forgotPasswordThunk}>send verification code to your email</button>
    </React.Fragment>
  )
}

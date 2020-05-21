import React, { useCallback, useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { EmailForm } from 'views/ForgotPassWord/EmailForm'
import { NewPasswordForm } from 'views/ForgotPassWord/NewPasswordForm'


const ForgotPassWord: React.FC = () => {
  const { isSendEmailForm } = useAppSelector( state => state.authForm.forgotPasswordForm )

  const dispatch = useAppDispatch()

  type IsSendEmailForm = typeof isSendEmailForm
  const handleSetIsSendEmailForm = useCallback(
    (isSendEmailForm: IsSendEmailForm) =>
    () => dispatch(actions.authForm.setIsSendEmailForm(!isSendEmailForm)),
    [dispatch]
  )

  useEffect(() => {
    return () => {
      dispatch(actions.authForm.setForgotPasswordForm({ email: '', newPassword: '', verificationCode: '' }))
      dispatch(actions.authForm.setIsSendEmailForm(true))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <h1>Forgot Password</h1>
      <div>
        { isSendEmailForm ? <EmailForm/> : <NewPasswordForm/> }
      </div>
      <div>
        <button onClick={handleSetIsSendEmailForm(isSendEmailForm)}>
          { isSendEmailForm ? "Go to new password form" : "Go to email form" }
        </button>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassWord

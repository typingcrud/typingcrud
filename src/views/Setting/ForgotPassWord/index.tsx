import React, { useCallback, useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { EmailForm } from 'views/Setting/ForgotPassWord/EmailForm'
import { NewPasswordForm } from 'views/Setting/ForgotPassWord/NewPasswordForm'


const ForgotPassWord: React.FC = () => {
  const { isSendEmailForm } = useAppSelector( state => state.authForm.forgotPasswordForm )

  const dispatch = useAppDispatch()

  type IsSendEmailForm = typeof isSendEmailForm
  const changeView = useCallback(
    (isSendEmailForm: IsSendEmailForm) =>
    () => dispatch(actions.authForm.changeViewOfForgotPassword(!isSendEmailForm)),
    [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.authForm.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h1>Forgot Password</h1>
      <div>
        { isSendEmailForm ? <EmailForm/> : <NewPasswordForm/> }
      </div>
      <div>
        <button onClick={changeView(isSendEmailForm)}>
          { isSendEmailForm ? "input new password" : "input email" }
        </button>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassWord

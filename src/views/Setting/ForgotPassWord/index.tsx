import React, { useCallback, useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { EmailForm } from 'views/Setting/ForgotPassWord/EmailForm'
import { NewPasswordForm } from 'views/Setting/ForgotPassWord/NewPasswordForm'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginLeft: 10,
      marginTop: 10,
      display: 'inline-block'
    },
  }),
)

const ForgotPassWord: React.FC = () => {
  const history = useHistory()
  const { isSendEmailForm } = useAppSelector( state => state.authForm.forgotPasswordForm )
  const { forgotPassword: cognitoSubmit } = useAppSelector(state => state.cognitoSubmit)

  const dispatch = useAppDispatch()
  const classes = useStyles()
  type IsSendEmailForm = typeof isSendEmailForm
  const changeView = useCallback(
    (isSendEmailForm: IsSendEmailForm) =>
    () => dispatch(actions.authForm.changeViewOfForgotPassword(!isSendEmailForm)),
    [dispatch]
  )

  useEffect(() => {
    if (cognitoSubmit) history.push('/signin')
  }, [cognitoSubmit, history])

  useEffect(() => {
    return () => {
      dispatch(actions.cognitoSubmit.reset())
      dispatch(actions.authForm.reset())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <h1>パスワードリセット</h1>
      <div>
        { isSendEmailForm ? <EmailForm/> : <NewPasswordForm/> }
      </div>
      <div>
        <Button className={classes.button} variant="outlined" onClick={changeView(isSendEmailForm)}>
          {isSendEmailForm ? "新しいパスワードを入力する" : "メールアドレスを入力する"}
        </Button>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassWord

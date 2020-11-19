import React, { useEffect, useCallback } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { SignUpForm } from 'views/Auth/SignUp/SignUpForm'
import { VerificationForm } from 'views/Auth/SignUp/VerificationForm'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },
    form: {
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 20,
      display: 'inline-block'
    },
    button: {
      marginLeft: 10,
      marginTop: 10,
      display: 'inline-block'
    },
  }),
)

const SignUp: React.FC = () => {
  const history = useHistory()
  const { isSignUpForm } = useAppSelector(state => state.authForm.signUpForm)
  const { signUp: cognitoSubmit } = useAppSelector(state => state.cognitoSubmit)
  const classes = useStyles()

  const dispatch = useAppDispatch()
  type IsSignUpForm = typeof isSignUpForm
  const changeView = useCallback(
    (isSignUpForm: IsSignUpForm) => () => {
      dispatch(actions.authForm.changeViewOfSignUp(!isSignUpForm))
    }, [dispatch]
  )

  useEffect(() => {
    if (cognitoSubmit) history.push('/user/signin')
  }, [cognitoSubmit, history])

  useEffect(() => {
    return () => {
      dispatch(actions.authForm.reset())
      dispatch(actions.cognitoSubmit.reset())
    }
  }, [dispatch])


  return (
    <React.Fragment>
      <h1>アカウント作成</h1>
      <div>
        { isSignUpForm ? <SignUpForm/> : <VerificationForm/> }
      </div>
      <div>
        <Button className={classes.button} variant="outlined" onClick={changeView(isSignUpForm)}>
          {isSignUpForm ? "認証コード入力" : "サインアップ画面へ戻る"}
      </Button>
      </div>
    </React.Fragment>
  )
}

export default SignUp

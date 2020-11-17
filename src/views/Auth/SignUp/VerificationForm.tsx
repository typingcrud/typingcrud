import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Input, InputLabel, FormControl } from '@material-ui/core'

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

export const VerificationForm: React.FC = () => {
  const classes = useStyles()

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
        <FormControl className={classes.form}>
          <InputLabel htmlFor="standard-adornment-email">メールアドレス</InputLabel>
          <Input
            id='email'
            value={signUpForm.email}
            onChange={changeForm(signUpForm)}
          />
        </FormControl>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="standard-adornment-password">認証コード</InputLabel>
          <Input
            id="verificationCode"
            value={signUpForm.verificationCode}
            onChange={changeForm(signUpForm)}
          />
        </FormControl>
        <Button className={classes.button} variant="outlined" color="primary" onClick={signUpVerifyThunk}>
          認証
        </Button>
      </div>
      <div>
        <Button className={classes.button} variant="outlined" onClick={signUpResendCodeThunk}>
          認証コードを再送信する
        </Button>
      </div>
    </React.Fragment>
  )
}

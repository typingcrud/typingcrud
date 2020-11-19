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

export const EmailForm: React.FC = () => {
  const { isSendEmailForm, ...forgotPassWordForm } = useAppSelector(state => state.authForm.forgotPasswordForm)
  const classes = useStyles()
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
    () => dispatch(thunkActions.auth.forgotPassword()), [dispatch]
  )

  return (
    <React.Fragment>
      <FormControl className={classes.form}>
        <InputLabel htmlFor="standard-adornment-email">メールアドレス</InputLabel>
        <Input
          id='email'
          value={forgotPassWordForm.email}
          onChange={changeForm(forgotPassWordForm)}
        />
      </FormControl>
      <Button className={classes.button} variant="outlined" color="primary" onClick={forgotPasswordThunk}>
        入力したメールアドレスに認証コードを送る
      </Button>
    </React.Fragment>
  )
}

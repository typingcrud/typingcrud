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
  const { isNewEmailForm, ...changeEmailForm } = useAppSelector(state => state.setting.changeEmailForm)
  const classes = useStyles()
  const dispatch = useAppDispatch()
  type ChangeEmailForm = typeof changeEmailForm
  const changeForm = useCallback(
    (changeEmailForm: ChangeEmailForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeChangeEmailForm({
        ...changeEmailForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const verifyNewEmail = useCallback(
    () => dispatch(thunkActions.setting.verifyNewEmail()), [dispatch]
  )
  
  return (
    <React.Fragment>
      <FormControl className={classes.form}>
        <InputLabel htmlFor="standard-adornment-email">認証コード</InputLabel>
        <Input
          id='verificationCode'
          value={changeEmailForm.verificationCode}
          onChange={changeForm(changeEmailForm)}
        />
      </FormControl>
      <Button className={classes.button} variant="outlined" color="primary" onClick={verifyNewEmail}>
        確定
      </Button>
    </React.Fragment>
  )
}

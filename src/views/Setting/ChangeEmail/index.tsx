import React, { useCallback, useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { ChangeEmailForm } from './ChangeEmailForm'
import { VerificationForm } from './VerificationForm'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginLeft: 10,
      marginTop: 10,
      display: 'inline-block'
    },
  }),
);

const ChangeEmail: React.FC = () => {
  const { isNewEmailForm } = useAppSelector(state => state.setting.changeEmailForm)
  const classes = useStyles();
  const dispatch = useAppDispatch()
  type IsNewEmailForm = typeof isNewEmailForm
  const changeView = useCallback(
    (isNewEmailForm: IsNewEmailForm) => () => {
      dispatch(actions.setting.changeViewOfChangeEmailForm(!isNewEmailForm))
    }, [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.setting.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h2>メールアドレスを変更する</h2>
      <div>
        { isNewEmailForm ? <ChangeEmailForm/> : <VerificationForm/> }
      </div>
      <div>
        <Button className={classes.button} variant="outlined" color="primary" onClick={changeView(isNewEmailForm)}>
          {isNewEmailForm ? "認証コードを入力する" : "新しいメールアドレスを入力する"}
        </Button>
      </div>
    </React.Fragment>
  )
}

export default ChangeEmail

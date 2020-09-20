import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
);

interface State {
  showPassword: boolean;
}

export const NewPasswordForm: React.FC = () => {
  const { isSendEmailForm, ...forgotPassWordForm } = useAppSelector(state => state.authForm.forgotPasswordForm)
  
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
  const submitNewPasswordThunk = useCallback(
    () => dispatch(thunkActions.auth.submitNewPassword()), [dispatch]
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
      <FormControl className={classes.form}>
        <InputLabel htmlFor="standard-adornment-password">新しいパスワード</InputLabel>
        <Input
          id="newPassword"
          type={values.showPassword ? 'text' : 'password'}
          value={forgotPassWordForm.newPassword}
          onChange={changeForm(forgotPassWordForm)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.form}>
        <InputLabel htmlFor="standard-adornment-email">認証コード</InputLabel>
        <Input
          id="verificationCode"
          value={forgotPassWordForm.verificationCode}
          onChange={changeForm(forgotPassWordForm)}
        />
      </FormControl>
      <Button className={classes.button} variant="outlined" color="primary" onClick={submitNewPasswordThunk}>
        確定
      </Button>
    </React.Fragment>
  )
}

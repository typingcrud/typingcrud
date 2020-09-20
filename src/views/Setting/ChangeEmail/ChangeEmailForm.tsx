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

export const ChangeEmailForm: React.FC = () => {
  const { isNewEmailForm, ...changeEmailForm } = useAppSelector(state => state.setting.changeEmailForm)
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
  const changeEmail = useCallback(
    () => dispatch(thunkActions.setting.changeEmail()), [dispatch]
  )
  
  return (
    <React.Fragment>
      <FormControl className={classes.form}>
        <InputLabel htmlFor="standard-adornment-email">メールアドレス</InputLabel>
        <Input
          id='newEmail'
          value={changeEmailForm.newEmail}
          onChange={changeForm(changeEmailForm)}
        />
      </FormControl>
      <FormControl className={classes.form}>
        <InputLabel htmlFor="standard-adornment-password">パスワード</InputLabel>
        <Input
          id='password'
          type={values.showPassword ? 'text' : 'password'}
          value={changeEmailForm.password}
          onChange={changeForm(changeEmailForm)}
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
      <Button className={classes.button} variant="outlined" color="primary" onClick={changeEmail}>
        認証コードを送信する
      </Button>
    </React.Fragment>
  )
}

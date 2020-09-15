import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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
  email: string;
  password: string;
  showPassword: boolean;
}

const SignIn: React.FC = () => {
  const history = useHistory()
  const link = (path: string) => () => history.push(path)

  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signInForm = useAppSelector(state => state.authForm.signInForm)

  const dispatch = useAppDispatch()
  type SignInForm = typeof signInForm
  const changeForm = useCallback(
    (signInForm: SignInForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.authForm.changeSignInForm({
        ...signInForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const signIn = useCallback(
    () => dispatch(thunkActions.auth.signIn()), [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.authForm.reset()) }
  }, [dispatch])

  return (
    <div>
      <h1>ログイン</h1>
      <div>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="standard-adornment-email">メールアドレス</InputLabel>
          <Input
            id='email'
            value={signInForm.email}
            onChange={changeForm(signInForm)}
          />
        </FormControl>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="standard-adornment-password">パスワード</InputLabel>
          <Input
            id='password'
            type={values.showPassword ? 'text' : 'password'}
            value={signInForm.password}
            onChange={changeForm(signInForm)}
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
        <Button className={classes.button} variant="outlined" color="primary" onClick={signIn}>
          ログイン
        </Button>
      </div>
      <Button className={classes.button} variant="outlined" onClick={link('/user/forgot-password')}>
        パスワードを忘れた
      </Button>
    </div>
  )
}

export default SignIn

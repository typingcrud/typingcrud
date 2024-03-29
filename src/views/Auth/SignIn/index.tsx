import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

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

interface State {
  showPassword: boolean
}

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const link = (path: string) => () => navigate(path)
  const classes = useStyles()

  const signInForm = useAppSelector(state => state.authForm.signInForm)
  const { signIn: cognitoSubmit } = useAppSelector(state => state.cognitoSubmit)

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

  const [values, setValues] = React.useState<State>({
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (cognitoSubmit) navigate('/')
  }, [cognitoSubmit, navigate])

  useEffect(() => {
    return () => {
      dispatch(actions.authForm.reset())
      dispatch(actions.cognitoSubmit.reset())
    }
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
      <Button className={classes.button} variant="outlined" onClick={link('/forgot-password')}>
        パスワードを忘れた
      </Button>
    </div>
  )
}

export default SignIn

import React, { useCallback } from 'react'

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
  email: string
  password: string
  showPassword: boolean
}

export const SignUpForm: React.FC = () => {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
  const signUpThunk = useCallback(
    () => dispatch(thunkActions.auth.signUp()), [dispatch]
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
          <InputLabel htmlFor="standard-adornment-password">パスワード</InputLabel>
          <Input
            id='password'
            type={values.showPassword ? 'text' : 'password'}
            value={signUpForm.password}
            onChange={changeForm(signUpForm)}
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
        <Button className={classes.button} variant="outlined" color="primary" onClick={signUpThunk}>
          登録
        </Button>
      </div>
    </React.Fragment>
  )
}

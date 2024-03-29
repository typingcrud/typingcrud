import React, { useCallback, useEffect } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

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

const ChangePassword: React.FC = () => {
  const navigate = useNavigate()
  const changePasswordForm = useAppSelector(state => state.setting.changePasswordForm)
  const { changePassword: cognitoSubmit } = useAppSelector(state => state.cognitoSubmit)

  const classes = useStyles()

  const [values, setValues] = React.useState<State>({
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const dispatch = useAppDispatch()
  type ChangePasswordForm = typeof changePasswordForm
  const changeForm = useCallback(
    (changePasswordForm: ChangePasswordForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeChangePasswordForm({
        ...changePasswordForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const changePassword = useCallback(
    () => dispatch(thunkActions.setting.changePassword()), [dispatch]
  )

  useEffect(() => {
    if (cognitoSubmit) navigate('/user')
  }, [cognitoSubmit, navigate])

  useEffect(() => {
    return () => {
      dispatch(actions.cognitoSubmit.reset())
      dispatch(actions.setting.reset())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <h2>パスワード変更</h2>
      <div>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="standard-adornment-password">現在のパスワード</InputLabel>
          <Input
            id='currentPassword'
            type={values.showPassword ? 'text' : 'password'}
            value={changePasswordForm.currentPassword}
            onChange={changeForm(changePasswordForm)}
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
        <div>
          <FormControl className={classes.form}>
            <InputLabel htmlFor="standard-adornment-password">新しいパスワード</InputLabel>
            <Input
              id='newPassword'
              type={values.showPassword ? 'text' : 'password'}
              value={changePasswordForm.newPassword}
              onChange={changeForm(changePasswordForm)}
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
            <InputLabel htmlFor="standard-adornment-password">新しいパスワード(確認)</InputLabel>
            <Input
              id='newPasswordConfirm'
              type={values.showPassword ? 'text' : 'password'}
              value={changePasswordForm.newPasswordConfirm}
              onChange={changeForm(changePasswordForm)}
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
        </div>
        <Button className={classes.button} variant="outlined" color="primary" onClick={changePassword}>
          確定
        </Button>
      </div>
    </React.Fragment>
  )
}

export default ChangePassword

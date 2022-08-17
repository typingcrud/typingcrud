import React, { useCallback, useEffect } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Button, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
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

const DeleteUser: React.FC = () => {
  const navigate = useNavigate()
  const { confirmPassword } = useAppSelector(state => state.setting.deleteUserForm)
  const { deleteUser: cognitoSubmit } = useAppSelector(state => state.cognitoSubmit)

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
  const changeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeDeleteUserForm(e.target.value))
    }, [dispatch]
  )
  const deleteUser = useCallback(
    () => dispatch(thunkActions.setting.deleteUser()), [dispatch]
  )

  useEffect(() => {
    if (cognitoSubmit) navigate('/')
  }, [cognitoSubmit, navigate])

  useEffect(() => {
    return () => {
      dispatch(actions.cognitoSubmit.reset())
      dispatch(actions.setting.reset())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <h2>アカウント削除</h2>
      <div>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="standard-adornment-password">パスワード</InputLabel>
          <Input
            id='confirmPassword'
            type={values.showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={changeForm}
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
        <Button className={classes.button} variant="outlined" color="primary" onClick={deleteUser}>
          削除
      </Button>
      </div>
    </React.Fragment>
  )
}

export default DeleteUser

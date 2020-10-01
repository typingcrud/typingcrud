import React, { useCallback, useEffect } from 'react'

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

export const DeleteUser: React.FC = () => {
  const { confirmPassword } = useAppSelector(state => state.setting.deleteUserForm)
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
  const changeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeDeleteUserForm(e.target.value))
    }, [dispatch]
  )
  const deleteUser = useCallback(
    () => dispatch(thunkActions.setting.deleteUser()), [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.setting.reset()) }
  }, [dispatch])

  return (
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
  )
}

import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const DeleteUser: React.FC = () => {
  const { deleteFlag, confirmPassword } = useAppSelector(state => state.setting.deleteUserForm)

  const dispatch = useAppDispatch()
  const changeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeDeleteUserForm(e.target.value))
    }, [dispatch]
  )
  const showDeleteForm = useCallback(
    () => {
      if (!deleteFlag) {
        if (window.confirm('Enter password to delete user')) {
          dispatch(actions.setting.showDeleteUserForm(!deleteFlag))
        }
      } else {
        dispatch(actions.setting.showDeleteUserForm(!deleteFlag))
      }
    }, [dispatch, deleteFlag]
  )
  const deleteUser = useCallback(
    () => dispatch(thunkActions.setting.deleteUser()), [dispatch]
  )

  return (
    <React.Fragment>
      <button onClick={showDeleteForm}>{ !deleteFlag ? 'delete user' : 'hide form' }</button>
      { deleteFlag &&
      <div>
        <input
          type='text'
          id='confirmPassword'
          placeholder='confirm password'
          value={confirmPassword}
          onChange={changeForm}
        />
        <button onClick={deleteUser}>delete user</button>
      </div>
      }
    </React.Fragment>
  )
}

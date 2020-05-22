import React, { useCallback } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'


export const DeleteUser: React.FC = () => {
  const { deleteFlag, confirmPassword } = useAppSelector(state => state.settingForm.deleteUserForm)

  const dispatch = useAppDispatch()
  const changeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.settingForm.changeDeleteUserForm(e.target.value))
    }, [dispatch]
  )
  const showDeleteForm = useCallback(
    () => {
      if (!deleteFlag) {
        if (window.confirm('Enter password to delete user')) {
          dispatch(actions.settingForm.showDeleteUserForm(!deleteFlag))
        }
      } else {
        dispatch(actions.settingForm.showDeleteUserForm(!deleteFlag))
      }
    }, [dispatch, deleteFlag]
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
        <button>delete user</button>
      </div>
      }
    </React.Fragment>
  )
}

import React, { useCallback, useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'


const ChangePassword: React.FC = () => {
  const changePasswordForm = useAppSelector(state => state.setting.changePasswordForm)

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

  useEffect(() => {
    return () => { dispatch(actions.setting.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h2>Change Password</h2>
      <div>
        <input
          type='text'
          id='currentPassword'
          placeholder='current password'
          value={changePasswordForm.currentPassword}
          onChange={changeForm(changePasswordForm)}
        />
        <input
          type='text'
          id='newPassword'
          placeholder='new password'
          value={changePasswordForm.newPassword}
          onChange={changeForm(changePasswordForm)}
        />
        <input
          type='text'
          id='newPasswordConfirm'
          placeholder='new password confirm'
          value={changePasswordForm.newPasswordConfirm}
          onChange={changeForm(changePasswordForm)}
        />
        <button>change password</button>
      </div>
    </React.Fragment>
  )
}

export default ChangePassword

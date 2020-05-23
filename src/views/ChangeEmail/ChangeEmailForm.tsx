import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const ChangeEmailForm: React.FC = () => {
  const { isNewEmailForm, ...changeEmailForm } = useAppSelector(state => state.setting.changeEmailForm)

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
      <input
        type='text'
        id='newEmail'
        placeholder='new email'
        value={changeEmailForm.newEmail}
        onChange={changeForm(changeEmailForm)}
      />
      <input
        type='text'
        id='password'
        placeholder='password'
        value={changeEmailForm.password}
        onChange={changeForm(changeEmailForm)}
      />
      <button onClick={changeEmail}>change email</button>
    </React.Fragment>
  )
}

import React, { useCallback, useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { ChangeEmailForm } from './ChangeEmailForm'
import { VerificationForm } from './VerificationForm'


const ChangeEmail: React.FC = () => {
  const { isNewEmailForm } = useAppSelector(state => state.setting.changeEmailForm)

  const dispatch = useAppDispatch()
  type IsNewEmailForm = typeof isNewEmailForm
  const changeView = useCallback(
    (isNewEmailForm: IsNewEmailForm) => () => {
      dispatch(actions.setting.changeViewOfChangeEmailForm(!isNewEmailForm))
    }, [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.setting.reset()) }
  }, [dispatch])

  return (
    <React.Fragment>
      <h2>Change Email</h2>
      <div>
        { isNewEmailForm ? <ChangeEmailForm/> : <VerificationForm/> }
      </div>
      <div>
        <button onClick={changeView(isNewEmailForm)}>
          { isNewEmailForm ? "input verification code" : "return to new email form" }
        </button>
      </div>
    </React.Fragment>
  )
}

export default ChangeEmail

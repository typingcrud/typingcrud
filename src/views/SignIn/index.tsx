import React, { useCallback } from 'react'
import { actions, useAppSelector, useAppDispatch } from 'state'

const SignIn: React.FC = () => {
  const signinForm = useAppSelector(state => state.auth.signinForm)

  const dispatch = useAppDispatch()
  const handleSetSignInForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.auth.setSignInForm({
        ...signinForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch, signinForm]
  )

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <input
          type='text'
          id='email'
          placeholder='email'
          value={signinForm.email}
          onChange={handleSetSignInForm}
        />
        <input
          type='text'
          id='password'
          placeholder='password'
          value={signinForm.password}
          onChange={handleSetSignInForm}
        />
      </div>
    </div>
  )
}

export default SignIn

import React, { useCallback } from 'react'
import { actions, useAppSelector, useAppDispatch } from 'state'

const SignIn: React.FC = () => {
  const signinForm = useAppSelector(state => state.auth.signinForm)

  const dispatch = useAppDispatch()
  type SignInForm = typeof signinForm
  const handleSetSignInForm = useCallback(
    (signinForm: SignInForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.auth.setSignInForm({
        ...signinForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
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
          onChange={handleSetSignInForm(signinForm)}
        />
        <input
          type='text'
          id='password'
          placeholder='password'
          value={signinForm.password}
          onChange={handleSetSignInForm(signinForm)}
        />
      </div>
    </div>
  )
}

export default SignIn

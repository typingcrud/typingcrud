import React, { useEffect, useCallback } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { SignUpForm } from 'views/SignUp/SignUpForm'
import { VerificationForm } from 'views/SignUp/VerificationForm'


const SignUp: React.FC = () => {
  const { isSignUpForm } = useAppSelector(state => state.authForm.signUpForm)

  const dispatch = useAppDispatch()
  type IsSignUpForm = typeof isSignUpForm
  const changeView = useCallback(
    (isSignUpForm: IsSignUpForm) => () => {
      dispatch(actions.authForm.changeViewOfSignUp(!isSignUpForm))
    }, [dispatch]
  )

  useEffect(() => {
    return () => { dispatch(actions.authForm.reset()) }
  }, [dispatch])


  return (
    <React.Fragment>
      <h1>sign up</h1>
      <div>
        { isSignUpForm ? <SignUpForm/> : <VerificationForm/> }
      </div>
      <div>
        <button onClick={changeView(isSignUpForm)}>
          { isSignUpForm ? "verify" : "return to sign up" }
        </button>
      </div>
    </React.Fragment>
  )
}

export default SignUp

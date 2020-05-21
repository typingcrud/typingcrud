import React, { useEffect } from 'react'

import { actions, useAppSelector, useAppDispatch } from 'state'
import { SignUpForm } from 'views/SignUp/SignUpForm'
import { VerificationForm } from 'views/SignUp/VerificationForm'


const SignUp: React.FC = () => {
  const { isSignUpForm } = useAppSelector(state => state.authForm.signUpForm)

  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(actions.authForm.setSignUpForm({ email: '', password: '', verificationCode: ''}))
      dispatch(actions.authForm.setIsSignUpForm(true))
    }
  }, [dispatch])


  return (
    <React.Fragment>
      { isSignUpForm ? <SignUpForm/> : <VerificationForm/> }
    </React.Fragment>
  )
}

export default SignUp

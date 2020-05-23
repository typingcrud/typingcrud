import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'
import axios from 'axios'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'


export const signUp = createAsyncThunk<void, void, ThunkAPI>(
  'auth/signUp',
  async (_, thunkAPI) => {
    const { isSignUpForm, ...signUpForm } = thunkAPI.getState().authForm.signUpForm
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: signUpForm.email
      })
    ]
    cognitoUserPool.signUp(signUpForm.email, signUpForm.password, attributeList, [], (err) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      alert("Success!")
      thunkAPI.dispatch(actions.authForm.changeViewOfSignUp(false))
    })
  }
)


export const signUpVerify = createAsyncThunk<void, void, ThunkAPI>(
  'auth/signUpVerify',
  async (_, thunkAPI) => {
    const { isSignUpForm, ...signUpForm } = thunkAPI.getState().authForm.signUpForm
    const cognitoUser = new CognitoUser({
      Username: signUpForm.email,
      Pool: cognitoUserPool
    })
    cognitoUser.confirmRegistration(signUpForm.verificationCode, true, (err: Error | undefined) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      axios.post('https://6lc7oim9w6.execute-api.ap-northeast-1.amazonaws.com/typing_cognito', {email: signUpForm.email})
        .then(() => {
          alert("Success!")
          thunkAPI.dispatch(actions.authForm.reset())
        })
        .catch((reason) => {
          console.error(reason)
        })
    })
  }
)


export const signUpResendCode = createAsyncThunk<void, void, ThunkAPI>(
  'auth/signUpResendCode',
  async (_, thunkAPI) => {
    const { isSignUpForm, ...signUpForm } = thunkAPI.getState().authForm.signUpForm
    const cognitoUser = new CognitoUser({
      Username: signUpForm.email,
      Pool: cognitoUserPool
    })
    cognitoUser.resendConfirmationCode((err) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      alert("Success!")
    })
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'
import axios from 'axios'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { AppState } from 'state'


export const signUpThunk = createAsyncThunk<
  void,
  void,
  {
    state: AppState,
  }
  >(
    'auth/signUpThunk',
    async (_, thunkAPI) => {
      const { isSignUpForm, ...signUpForm } = thunkAPI.getState().form.signUpForm
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
      })
    }
  )


export const signUpVerifyThunk = createAsyncThunk<
  void,
  void,
  {
    state: AppState,
  }
  >(
    'auth/signUpVerifyThunk',
    async (_, thunkAPI) => {
      const { isSignUpForm, ...signUpForm } = thunkAPI.getState().form.signUpForm
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
          })
          .catch((reason) => {
            console.error(reason)
          })
      })
    }
  )


export const signUpResendCodeThunk = createAsyncThunk<
  void,
  void,
  {
    state: AppState,
  }
  >(
    'auth/signUpResendCodeThunk',
    async (_, thunkAPI) => {
      const { isSignUpForm, ...signUpForm } = thunkAPI.getState().form.signUpForm
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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'


export const forgotPassword = createAsyncThunk<void, void, ThunkAPI>(
  'auth/forgotPassword',
  async (_, thunkAPI) => {
    const { email } = thunkAPI.getState().authForm.forgotPasswordForm
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: cognitoUserPool
    })
    cognitoUser.forgotPassword({
      onSuccess: () => {
        alert('success')
        thunkAPI.dispatch(actions.authForm.changeViewOfForgotPassword(false))
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)


export const submitNewPassword = createAsyncThunk<void, void, ThunkAPI>(
  'auth/submitNewPassword',
  async (_, thunkAPI) => {
    const { email, newPassword, verificationCode } = thunkAPI.getState().authForm.forgotPasswordForm
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: cognitoUserPool
    })
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        alert('success')
        thunkAPI.dispatch(actions.authForm.reset())
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)

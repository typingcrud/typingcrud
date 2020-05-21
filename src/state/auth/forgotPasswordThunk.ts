import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser } from 'amazon-cognito-identity-js'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { AppState, AppDispatch } from 'state'


export const forgotPasswordThunk = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
  }
  >(
    'auth/forgotPasswordThunk',
    async (_, thunkAPI) => {
      const { email } = thunkAPI.getState().authForm.forgotPasswordForm
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: cognitoUserPool
      })
      cognitoUser.forgotPassword({
        onSuccess: () => {},
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err))
        }
      })
    }
  )


export const submitNewPasswordThunk = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
  }
  >(
    'auth/submitNewPasswordThunk',
    async (_, thunkAPI) => {
      const { email, newPassword, verificationCode } = thunkAPI.getState().authForm.forgotPasswordForm
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: cognitoUserPool
      })
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {},
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err))
        }
      })
    }
  )

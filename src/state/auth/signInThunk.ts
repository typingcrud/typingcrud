import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { AppState, AppDispatch, actions } from 'state'


export const signInThunk = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
  }
  >(
    'auth/signInThunk',
    async (_, thunkAPI) => {
      const signinForm = thunkAPI.getState().form.signinForm
      const authenticationDetails = new AuthenticationDetails({
        Username: signinForm.email,
        Password: signinForm.password
      })
      const cognitUser = new CognitoUser({
        Username: signinForm.email,
        Pool: cognitoUserPool
      })
      cognitUser.authenticateUser(authenticationDetails, {
        onSuccess: (res) => {
          thunkAPI.dispatch(actions.form.setSignInForm({
            email: '',
            password: '',
          }))
          thunkAPI.dispatch(actions.auth.setCognitoUser(true))
          thunkAPI.dispatch(actions.auth.setTokens({
            idToken: res.getIdToken().getJwtToken(),
            accessToken: res.getAccessToken().getJwtToken(),
            refreshToken: res.getRefreshToken().getToken()
          }))
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err))
        }
      })
    }
  )

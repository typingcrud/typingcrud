import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { newUserPool } from 'utils/cognito/cognito-utils'
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
        Pool: newUserPool()
      })
      cognitUser.authenticateUser(authenticationDetails, {
        onSuccess: (res) => {
          thunkAPI.dispatch(actions.form.setSignInForm({
            email: '',
            password: '',
          }))
          localStorage.setItem('IDToken', res.getIdToken().getJwtToken())
          localStorage.setItem('AccessToken', res.getAccessToken().getJwtToken())
          localStorage.setItem('RefreshToken', res.getRefreshToken().getToken())
          console.log(res)
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err))
        }
      })
    }
  )

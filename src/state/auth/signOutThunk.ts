import { createAsyncThunk } from '@reduxjs/toolkit'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { AppState, AppDispatch, actions } from 'state'


export const signOutThunk = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
  }
  >(
    'auth/signOutThunk',
    async (_, thunkAPI) => {
      const cognitoUser = cognitoUserPool.getCurrentUser()
      if (cognitoUser) {
        cognitoUser.signOut()
      }
      thunkAPI.dispatch(actions.auth.setCognitoUser(false))
      thunkAPI.dispatch(actions.auth.setTokens(null))
    }
  )

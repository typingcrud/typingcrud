import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'


export const signOutThunk = createAsyncThunk<void, void, ThunkAPI>(
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

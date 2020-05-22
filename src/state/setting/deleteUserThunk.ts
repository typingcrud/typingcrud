import { createAsyncThunk } from '@reduxjs/toolkit'
import {AuthenticationDetails} from 'amazon-cognito-identity-js'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { ThunkAPI } from 'utils/thunk'
import { thunkActions } from 'state'

export const deleteUserThunk = createAsyncThunk<void, void, ThunkAPI>(
  'setting/deleteUserThunk',
  async (_, thunkAPI) => {
    const { confirmPassword } = thunkAPI.getState().setting.deleteUserForm
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (cognitoUser === null) {
      alert('require signin')
      return
    }
    const authenticationDetails = new AuthenticationDetails({
      Username: cognitoUser.getUsername(),
      Password: confirmPassword
    })
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.deleteUser((err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err))
          }
          console.log(cognitoUserPool.getCurrentUser())
          thunkAPI.dispatch(thunkActions.auth.signOutThunk)
          alert(result + ": User deleted")
        })
      },
      onFailure: (err: Error) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)

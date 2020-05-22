import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { thunkActions, actions } from 'state'

export const deleteUser = createAsyncThunk<void, void, ThunkAPI>(
  'setting/deleteUser',
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
          thunkAPI.dispatch(thunkActions.auth.signOut())
          thunkAPI.dispatch(actions.setting.reset())
          alert(result + ": User deleted")
        })
      },
      onFailure: (err: Error) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'

export const changePassword = createAsyncThunk<void, void, ThunkAPI>(
  'setting/changePassword',
  async (_, thunkAPI) => {
    const { currentPassword, newPassword, newPasswordConfirm } = thunkAPI.getState().setting.changePasswordForm
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (newPassword !== newPasswordConfirm) {
      alert('New password and confirmation are different')
      return
    }
    if (cognitoUser === null) {
      alert('require signin')
      return
    }
    const authenticationDetails = new AuthenticationDetails({
      Username: cognitoUser.getUsername(),
      Password: currentPassword
    })
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.changePassword(currentPassword, newPassword, (err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err))
            return
          }
          alert("Password changed: " + result)
          thunkAPI.dispatch(actions.setting.reset())
        })
      },
      onFailure: (err: Error) => {
        alert(err.message || JSON.stringify(err)) 
      }
    })
  }
)

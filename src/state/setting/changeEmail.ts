import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { actions } from 'state'


export const changeEmail = createAsyncThunk<void, void, ThunkAPI>(
  'setting/changeEmail',
  async (_, thunkAPI) => {
    const { password, newEmail } = thunkAPI.getState().setting.changeEmailForm
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (cognitoUser === null) {
      alert('required signin')
      return
    }
    const authenticationDetails = new AuthenticationDetails({
      Username: cognitoUser.getUsername(),
      Password: password
    })
    const attributes = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: newEmail
      })
    ]
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.updateAttributes(attributes, (err) => {
          if (err) {
            alert(err.message || JSON.stringify(err))
            return
          }
          alert('success')
          thunkAPI.dispatch(actions.setting.changeViewOfChangeEmailForm(false))
        })
      },
      onFailure: (err: Error) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)

export const verifyNewEmail = createAsyncThunk<void, void, ThunkAPI>(
  'setting/verifyNewEmail',
  async (_, thunkAPI) => {
    const { password, verificationCode } = thunkAPI.getState().setting.changeEmailForm
    const cognitoUser = cognitoUserPool.getCurrentUser()
    if (cognitoUser === null) {
      alert('required signin')
      return
    }
    const authenticationDetails = new AuthenticationDetails({
      Username: cognitoUser.getUsername(),
      Password: password
    })
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        cognitoUser.verifyAttribute('email', verificationCode , {
          onSuccess: (success) => {
            alert(success)
            thunkAPI.dispatch(actions.setting.reset())
          },
          onFailure: (err) => {
            alert(err.message || JSON.stringify(err))
          }
        })
      },
      onFailure: (err: Error) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import axios, { AxiosRequestConfig } from 'axios'
import { thunkActions, actions } from 'state'

export const deleteUser = createAsyncThunk<void, void, ThunkAPI>(
  'setting/deleteUser',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
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
          const params = {
            userId: userId
          }

          const options: AxiosRequestConfig = {
            method: 'DELETE',
            headers: {
              Authorization: idToken
            },
            params: params,
            url: process.env.REACT_APP_API_BASE + "user",
          }

          axios(options)
            .then((results) => {
              console.log(results)
            })
            .catch(async () => {
              thunkAPI.dispatch(thunkActions.auth.updateTokens())
              options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
              await axios(options)
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  console.log(err)
                  alert("Failure")
                })
            })
          
          alert(result + ": User deleted")
        })
      },
      onFailure: (err: Error) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)

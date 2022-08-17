import { ThunkAPI } from 'utils/thunk'
import { actions, thunkActions } from 'state'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

export const getUserInfo = createAsyncThunk<void, void, ThunkAPI>(
  'auth/getUserInfo',
  async (_, thunkAPI) => {
    const tmpUserId = thunkAPI.getState().auth.userId
    const tmpIdToken = thunkAPI.getState().auth.tokens?.idToken

    const userId = tmpUserId ? tmpUserId : ''
    const idToken = tmpIdToken ? tmpIdToken : ''

    const params = {
      userId: userId
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: idToken
      },
      params: params,
      url: process.env.REACT_APP_API_BASE + "user",
    }

    axios(options)
      .then((results) => {
        if (results.data.body.imgOwn) {
          localStorage.setItem('userInfo', JSON.stringify(results.data.body))
          thunkAPI.dispatch(actions.auth.setUserInfo(results.data.body))
        }
      })
      .catch(async () => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        const tmpIdToken_ = thunkAPI.getState().auth.tokens?.idToken

        if (options.headers) {
          options.headers.Authorization = tmpIdToken_ ? tmpIdToken_ : ''
        }
        await axios(options)
          .then((res) => {
            if (res.data.body.imgOwn) {
              localStorage.setItem('userInfo', JSON.stringify(res.data.body))
              thunkAPI.dispatch(actions.auth.setUserInfo(res.data.body))
            }
          })
          .catch((err) => {
            console.log(err)
            alert("Failure")
          })
      })
  }
)

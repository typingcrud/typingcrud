import { ThunkAPI } from 'utils/thunk'
import { actions, thunkActions, useAppDispatch } from 'state'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

export const getUserInfo = createAsyncThunk<void, void, ThunkAPI>(
  'auth/getUserInfo',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const dispatch = useAppDispatch()

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
        console.log(results.data)
        //dispatch(actions.auth.setUserInfo(results.data))
      })
      .catch(async () => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
        await axios(options)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
            alert("Failure")
          })
      })
  }
)

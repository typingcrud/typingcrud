import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { sha256 } from 'js-sha256'

import { ThunkAPI } from 'utils/thunk'
import { thunkActions, actions } from 'state'

export const submit = createAsyncThunk<void, void, ThunkAPI>(
  'setting/image',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const gameForm = thunkAPI.getState().gameForm

    const params = {
      userId: userId,
      userName: sha256(userId + (new Date()).getTime().toString()),
      createdAt: gameForm.title,
      img: gameForm.description,
      imgType: gameForm.code.replace(/\n|\r/g, '\\n')
    }

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: idToken
      },
      params: params,
      url: process.env.REACT_APP_API_BASE + "game",
    }

    axios(options)
      .then((results) => {
        console.log(results)
        thunkAPI.dispatch(actions.gameForm.reset())
        alert("Success!!")
      })
      .catch(async () => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
        try {
          const res = await axios(options)
          console.log(res)
        }
        catch (err) {
          console.log(err)
          alert("Failure")
        }
      })
  }
)

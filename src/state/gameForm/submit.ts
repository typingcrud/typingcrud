import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkAPI } from 'utils/thunk'
import axios, { AxiosRequestConfig } from 'axios'

export const submit = createAsyncThunk<void, void, ThunkAPI>(
  'gameForm/submit',
  async (_, thunkAPI) => {
    const userID = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const gameForm = thunkAPI.getState().gameForm

    const params = {
      userID: userID,
      index: "test",
      title: gameForm.title,
      description: gameForm.description,
      code: gameForm.code,
      codeComment: gameForm.codeComment,
    }

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: idToken
      },
      params: params,
      url: process.env.REACT_APP_GAME_API
    }

    axios(options)
      .then((results) => {
        console.log(results)
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

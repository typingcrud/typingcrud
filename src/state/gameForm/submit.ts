import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { sha256 } from 'js-sha256'

import { ThunkAPI } from 'utils/thunk'
import { actions } from 'state'

export const submit = createAsyncThunk<void, void, ThunkAPI>(
  'gameForm/submit',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const gameForm = thunkAPI.getState().gameForm

    const params = {
      userId: userId,
      index: sha256(userId + (new Date()).getTime().toString()),
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
      url: process.env.REACT_APP_API_BASE + "game",
    }

    axios(options)
      .then((results) => {
        console.log(results)
        thunkAPI.dispatch(actions.gameForm.reset())
        alert("Success!!")
      })
      .catch((err) => {
        console.log(err)
        alert("Failure")
      })
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'

type Game = App.Game

export const getGame = createAsyncThunk<Game | void, string, ThunkAPI>(
  'gameForm/getGame',
  async (index, thunkAPI) => {
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const userId = thunkAPI.getState().auth.userId

    const params = {
      userId: userId,
      index: index,
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      params: params,
      headers: {
        Authorization: idToken
      },
      url: process.env.REACT_APP_API_BASE + "game",
    }

    const response = await axios(options)
      .then((res) => {
        return res.data?.[0] as Game
      })
      .catch((err) => {
        console.log(err)
      })

    return response
  }
)

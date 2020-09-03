import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

import { ThunkAPI } from 'utils/thunk'
import { AppState } from 'state'

type GameList = AppState['gameList']

export const getGames = createAsyncThunk<GameList | void, void, ThunkAPI>(
  'gameList/getGames',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId

    const params = {
      userId: userId,
      index: "",
      scanFlag: "0",
      filterTime: "0",
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      params: params,
      url: process.env.REACT_APP_API_BASE + "game",
    }

    const response = await axios(options)
      .then((res) => {
        return res.data.body as GameList
      })
      .catch((err) => {
        console.log(err)
      })

    return response
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

import { ThunkAPI } from 'utils/thunk'
import { actions } from 'state'
import { GameList } from 'state/game/gameList'

export const getGames = createAsyncThunk<void, void, ThunkAPI>(
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

    axios(options)
      .then((res) => {
        thunkAPI.dispatch(actions.gameList.setGames(res.data.body as GameList))
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

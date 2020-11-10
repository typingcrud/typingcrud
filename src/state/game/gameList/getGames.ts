import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'
import { thunkActions, AppState } from 'state'

type GameList = AppState['gameList']

export const getGames = createAsyncThunk<GameList | void, void, ThunkAPI>(
  'gameList/getGames',
  async (_, thunkAPI) => {
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const userId = thunkAPI.getState().auth.userId

    const params = {
      userId: userId
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
        return res.data as GameList
      })
      .catch(() => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
        return axios(options)
          .then((res) => {
            return res.data as GameList
          })
          .catch((err) => {
            console.error(err)
          })
      })
    
    return response
  }
)

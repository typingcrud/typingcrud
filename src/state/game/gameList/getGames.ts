import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'
import { thunkActions } from 'state'

type GameList = App.Game[]

export const getGames = createAsyncThunk<GameList | void, void, ThunkAPI>(
  'gameList/getGames',
  async (_, thunkAPI) => {
    const tmpIdToken = thunkAPI.getState().auth.tokens?.idToken
    const idToken = tmpIdToken ? tmpIdToken : ''
    const userId = thunkAPI.getState().auth.userId

    const params = {
      userId: userId,
      index: '0'
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
        const tmpIdToken_ = thunkAPI.getState().auth.tokens?.idToken

        if (options.headers) {
          options.headers.Authorization = tmpIdToken_ ? tmpIdToken_ : ''
        }

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

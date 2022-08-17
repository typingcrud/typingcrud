import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'

type Game = App.Game

type Response = {
  game: Game | undefined
  userId: string
}

export const getGame = createAsyncThunk<Response | void, string, ThunkAPI>(
  'gameForm/getGame',
  async (index, thunkAPI) => {
    const tmpIdToken = thunkAPI.getState().auth.tokens?.idToken
    const idToken = tmpIdToken ? tmpIdToken : ''
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
        const game = res.data?.[0] as (Game | undefined)
        const response: Response = { game,  userId }
        return response
      })
      .catch((err) => {
        console.log(err)
      })

    return response
  }
)

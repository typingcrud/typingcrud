import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'
import { thunkActions, AppState } from 'state'
import GameList from 'views/Game/GameList'

type GameList = AppState['gameList']['gamearray']

export const getGames = createAsyncThunk<GameList, void, ThunkAPI>(
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
        return res.data.body as GameList
      })
      .catch(() => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
        return axios(options)
          .then((res) => {
            return res.data.body as GameList
          })
          .catch((err) => {
            console.error(err)
            return [
              {
                code: "",
                codeComment: "",
                createAt: "",
                description: "",
                index: "",
                title: "",
                updateAt: "",
                userId: ""
              }
            ] as GameList
          })
      })
    
    return response
  }
)

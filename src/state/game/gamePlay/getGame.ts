import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { AppState } from 'state'

type Game = AppState['gamePlay']

export const getGame = createAsyncThunk<Game | void, {index: string}, {}>(
  'gamePlay/getGame',
  async ({index}) => {

    const params = {
      index: index,
      filterTime: "0"
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      params: params,
      url: process.env.REACT_APP_API_BASE + "game/public",
    }

    const response = await axios(options)
      .then((res) => {
        return res.data.body as Game
      })
      .catch((err) => {
        console.log(err)
      })

    return response
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'

type HomeList = App.Game[]

export const getHomeGames = createAsyncThunk<HomeList | void, void, ThunkAPI>(
  'homeList/getHomeGames',
  async (_, thunkAPI) => {
    const page = thunkAPI.getState().homeList.page

    const params = {
      index: '0',
      p: page,
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      params: params,
      url: process.env.REACT_APP_API_BASE + "game/public",
    }

    const response = await axios(options)
      .then((res) => { return res.data as HomeList })
      .catch((err) => { console.error(err) })
    
    return response
  }
)

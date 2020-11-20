import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'

type HomeList = Omit<App.Game, 'userId'>[]
type Resdata = Array<Omit<App.Game, 'userId'> & { maxPage: string }>

type Result = {
  list: HomeList
  maxPage: number
}

export const getHomeGames = createAsyncThunk<Result | void, void, ThunkAPI>(
  'homeList/getHomeGames',
  async (_, thunkAPI) => {
    const page = thunkAPI.getState().homeList.page

    const params = {
      index: '0',
      p: page.toString(),
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      params: params,
      url: process.env.REACT_APP_API_BASE + "game/public",
    }

    const response = await axios(options)
      .then((res) => { 
        const resdata = res.data.Items as Resdata
        const list: HomeList = resdata.map((data) => {
          const { maxPage, ...homelist } = data
          return homelist
        })
        const elem = resdata.pop()
        const maxPage = elem ? parseInt(elem.maxPage) : 1
        return { list: list, maxPage: maxPage }
      })
      .catch((err) => { console.error(err) })
    
    return response
  }
)

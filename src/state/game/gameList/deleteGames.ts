import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

import { ThunkAPI } from 'utils/thunk'

type Args = {
  index: string
  gameUserId: string
}

export const deleteGame = createAsyncThunk<App.Game[] | void, Args, ThunkAPI>(
  'gameList/deleteGame',
  async ({ index, gameUserId }, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken

    if (userId === gameUserId) {
      const params = {
        index: index,
        userId: userId,
      }

      const options: AxiosRequestConfig = {
        method: 'DELETE',
        headers: {
          Authorization: idToken
        },
        params: params,
        url: process.env.REACT_APP_API_BASE + "game",
      }

      return await axios(options)
        .then((value) => (value.data as App.Game[]))
        .catch((err) => {console.error(err)})
    } else {
      console.error('自分のゲーム以外を削除しようとした')
    }
  }
)

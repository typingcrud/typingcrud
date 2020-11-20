import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'

import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

export const update = createAsyncThunk<(App.Game[] | void), string, ThunkAPI>(
  'gameForm/update',
  async (index, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const { title, description, lang, code, codeComment } = thunkAPI.getState().gameForm.game
    const { isAscii, isFilled } = thunkAPI.getState().gameForm.valid

    if (!isAscii || !isFilled) {
      console.error('Validation has been submitted despite the fact that it has failed')
      return
    }

    const params = {
      userId: userId,
      index: index,
    }

    const data: string = JSON.stringify({
      updatedAt: moment().format("YYYY MM/DD HH:mm:ss").toString(),
      title: title,
      description: description,
      lang: lang,
      code: code,
      codeComment: codeComment,
    })

    const options: AxiosRequestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: idToken,
        "Content-Type": "application/json"
      },
      params: params,
      data: data,
      url: process.env.REACT_APP_API_BASE + "game",
    }

    return await axios(options)
      .then((value) => (value.data as App.Game[]))
      .catch((err) => {console.error(err)})
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'
import { sha256 } from 'js-sha256'
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

export const create = createAsyncThunk<void, void, ThunkAPI>(
  'gameForm/create',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const { title, description, lang, code, codeComment } = thunkAPI.getState().gameForm

    const params = {
      userId: userId,
      index: sha256(userId + (new Date()).getTime().toString())
    }

    const data: string = JSON.stringify({
      createdAt: moment().format("YYYY MM/DD HH:mm:ss").toString(),
      title: title,
      description: description,
      lang: lang,
      code: code,
      codeComment: codeComment,
    })

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: idToken,
        "Content-Type": "application/json"
      },
      params: params,
      data: data,
      url: process.env.REACT_APP_API_BASE + "game",
    }

    axios(options)
      .then((value) => console.log(value))
      .catch((err) => console.log(err))
  }
)

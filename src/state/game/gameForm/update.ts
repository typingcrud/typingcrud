import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import { ThunkAPI } from 'utils/thunk'

import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.locale('ja')
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault("Asia/Tokyo")

export const update = createAsyncThunk<(App.Game[] | void), string, ThunkAPI>(
  'gameForm/update',
  async (index, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const tmpIdToken = thunkAPI.getState().auth.tokens?.idToken
    const idToken = tmpIdToken ? tmpIdToken : ''
    const { title, description, lang, code, codeComment } = thunkAPI.getState().gameForm.game
    const { isAscii, isFilled } = thunkAPI.getState().gameForm.valid
    const { isCorrect } = thunkAPI.getState().gameForm

    if (!isAscii || !isFilled) {
      console.error('Validation has been submitted despite the fact that it has failed')
      return
    }

    if (!isCorrect.userId) {
      console.error('異なるユーザのコードを編集しようとしています')
      return
    }

    if (!isCorrect.exist) {
      console.error('存在しないゲームをアップデートしようとしています')
      return
    }

    const params = {
      userId: userId,
      index: index,
    }

    const data: string = JSON.stringify({
      updatedAt: dayjs().tz().format("YYYY MM/DD HH:mm:ss").toString(),
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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkAPI } from 'utils/thunk'
import { thunkActions, actions } from 'state'

import axios, { AxiosRequestConfig } from 'axios'
import { sha256 } from 'js-sha256'
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

export const submit = createAsyncThunk<void, void, ThunkAPI>(
  'gameForm/submit',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const gameForm = thunkAPI.getState().gameForm

    const params = {
      userId: userId,
      index: sha256(userId + (new Date()).getTime().toString())
    }

    const data: string = JSON.stringify({
      createdAt: moment().format("YYYYMM/DD hh:mm:ss").toString(),
      title: gameForm.title,
      description: gameForm.description,
      code: gameForm.code.replace(/\n|\r/g, '\\n'),
      codeComment: gameForm.codeComment.replace(/\n|\r/g, '\\n')
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
      .then((results) => {
        console.log(results)
        thunkAPI.dispatch(actions.gameForm.reset())
        alert("Success!!")
      })
      .catch(async () => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
        try {
          const res = await axios(options)
          console.log(res)
        }
        catch (err) {
          console.log(err)
          alert("Failure")
        }
      })
  }
)

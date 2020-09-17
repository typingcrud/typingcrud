import { ThunkAPI } from 'utils/thunk'
import { thunkActions } from 'state'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

export type Imgdata = {
  userName: string,
  imgType: string,
  imgOwn: string,
  img64: string
}

export const image = createAsyncThunk<void, { imgdata: Imgdata }, ThunkAPI>(
  'setting/image',
  async ({ imgdata } , thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken

    const params = {
      userId: userId,
      userName: imgdata.userName,
      imgType: imgdata.imgType,
      imgOwn: imgdata.imgOwn
    }

    const data: string = JSON.stringify({
      createdAt: moment().format("YYYYMM/DD hh:mm:ss").toString(),
      img64: imgdata.img64
    })

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        Authorization: idToken,
        "Content-Type": "application/json",
      },
      params: params,
      data: data,
      url: process.env.REACT_APP_API_BASE + "user",
    }

    axios(options)
      .then((results) => {
        console.log(results)
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

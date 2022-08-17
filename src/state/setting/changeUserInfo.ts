import { ThunkAPI } from 'utils/thunk'
import { thunkActions } from 'state'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.locale('ja')
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault("Asia/Tokyo")

export const changeUserInfo = createAsyncThunk<void, ('name' | 'img'), ThunkAPI>(
  'setting/changeUserInfo',
  async (mode, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const tmpIdToken = thunkAPI.getState().auth.tokens?.idToken
    const idToken = tmpIdToken ? tmpIdToken : ''
    const changeUserInfo = thunkAPI.getState().setting.changeUserInfo

    const params = {
      userId: userId,
      userName: changeUserInfo.userName,
      imgType: changeUserInfo.imgType,
      imgOwn: thunkAPI.getState().auth.userInfo.imgOwn
    }

    let data = {
      updatedAt: dayjs().tz().format("YYYY MM/DD HH:mm:ss").toString(),
      img64: (mode === 'name') ? '0' : changeUserInfo.img64
    }

    const options: AxiosRequestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: idToken,
        "Content-Type": "application/json"
      },
      params: params,
      data: JSON.stringify(data),
      url: process.env.REACT_APP_API_BASE + "user",
    }

    axios(options)
      .then((results) => {
        thunkAPI.dispatch(thunkActions.auth.getUserInfo())
        console.log(results)
      })
      .catch(async () => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        const tmpIdToken_ = thunkAPI.getState().auth.tokens?.idToken

        if (options.headers) {
          options.headers.Authorization = tmpIdToken_ ? tmpIdToken_ : ''
        }
        
        await axios(options)
          .then((res) => {
            thunkAPI.dispatch(thunkActions.auth.getUserInfo())
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
            alert("Failure")
          })
      })
  }
)

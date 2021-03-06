import { ThunkAPI } from 'utils/thunk'
import { thunkActions } from 'state'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

export const changeUserInfo = createAsyncThunk<void, ('name' | 'img'), ThunkAPI>(
  'setting/changeUserInfo',
  async (mode, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const changeUserInfo = thunkAPI.getState().setting.changeUserInfo

    const params = {
      userId: userId,
      userName: changeUserInfo.userName,
      imgType: changeUserInfo.imgType,
      imgOwn: thunkAPI.getState().auth.userInfo.imgOwn
    }

    let data = {
      updatedAt: moment().format("YYYY MM/DD HH:mm:ss").toString(),
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
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
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

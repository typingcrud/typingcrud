import { ThunkAPI } from 'utils/thunk'
import { thunkActions } from 'state'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')

export const changeUserInfo = createAsyncThunk<void, void, ThunkAPI>(
  'setting/changeUserInfo',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken
    const chageUserInfo = thunkAPI.getState().setting.changeUserInfo
    console.log(changeUserInfo)
    
    const params = {
      userId: userId,
      userName: chageUserInfo.userName,
      imgType: chageUserInfo.imgType,
      imgOwn: "1" //stateから持ってくる
    }

    const data: string = JSON.stringify({
      updatedAt: moment().format("YYYY MM/DD HH:mm:ss").toString(),
      img64: chageUserInfo.img64
    })

    const options: AxiosRequestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: idToken,
        "Content-Type": "application/json"
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
        await axios(options)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
            alert("Failure")
          })
      })
  }
)

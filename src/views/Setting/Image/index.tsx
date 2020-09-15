import React, { useCallback, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAppSelector, useAppDispatch } from 'state'
import Dropzone from 'react-dropzone';
import moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja')


const Image: React.FC = () => {
  const dispatch = useAppDispatch()

  const idToken = useAppSelector(state => state.auth.tokens?.idToken)
  const userId = useAppSelector(state => state.auth.userId)

  let base64: string = ""
  let imgType: string = ""

  const getOptions = (method: "GET" | "POST" | "PATCH" | "DELETE", params: any, data: any): AxiosRequestConfig => {
    return {
      method: method,
      headers: {
        Authorization: idToken,
        "Content-Type": "application/json",
      },
      params: params,
      data: data,
      url: process.env.REACT_APP_API_BASE + "user",
    }
  }

  const postImage = () => {
    const params = {
      userId: userId,
      userName: "Karasawa",
      imgType: imgType
    }

    const data = JSON.stringify({
      createdAt: moment().format("YYYYMM/DD hh:mm:ss").toString(),
      img64: base64
    })

    const options = getOptions("POST", params, data)

    axios(options)
      .catch((error) => {
        console.log("POSTに失敗しました。↓がエラー結果です")
        console.log(error)
      })
  }

  
  
  const handleImage = (f: FileList | null) => {
    const r = new FileReader()
    let imgf: any = ""
    if (f !== null) {
      imgf = f
    }
    r.readAsDataURL(imgf[0])
    r.onload = () => {
      let encodedImg: string | ArrayBuffer | null = r.result
      imgType = imgf[0].type.split('image/')[1]
      if (typeof (encodedImg) === "string") {
        if (imgType === "jpg") {
          base64 = encodedImg.replace('data:image/jpg;base64,', '')
        } else if (imgType === "jpeg") {
          base64 = encodedImg.replace('data:image/jpeg;base64,', '')
        } else if (imgType === "png") {
          base64 = encodedImg.replace('data:image/png;base64,', '')
        } else {
          base64 = ""
        }
      }
    }
  }

    return (
    <React.Fragment>
      <h1>アイコン画像設定</h1>
      <input type="file" accept="img/*" onChange={e => handleImage(e.target.files)} />
      <button onClick={postImage}>Upload</button>
    </React.Fragment>
  )
}

export default Image

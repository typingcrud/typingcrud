import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAppSelector } from 'state'

export const SignedIn: React.FC = () => {
  const idToken = useAppSelector(state => state.auth.tokens?.idToken)
  const userId = useAppSelector(state => state.auth.userId)

  const getOptions = (method: "GET" | "POST" | "PATCH" | "DELETE", params: any): AxiosRequestConfig => {
    return {
      method: method,
      headers: {
        Authorization: idToken
      },
      params: params,
      url: process.env.REACT_APP_API_BASE + "game",
    }
  }

  const getUserId = () => {
    console.log(userId)
  }

  const getDynamo = () => {
    const params = {
      userId: userId
    }

    const options = getOptions("GET", params)

    axios(options)
      .then((results) => {
        console.log(results.data)
      })
      .catch((error) => {
        console.log("GETに失敗しました。↓がエラー結果です")
        console.log(error)
      })
  }

  const postDynamo = () => {
    const params = {
      userId: userId,
      index: "index",
      code: "aaa",
      codeComment: "frgrgt",
      description: "string",
      title: "title"
    }

    const options = getOptions("POST", params)

    axios(options)
      .then((results) => {
        console.log(results)
      })
      .catch((error) => {
        console.log("POSTに失敗しました。↓がエラー結果です")
        console.log(error)
      })
  }

  const patchDynamo = () => {
    const params = {
      userId: userId,
      index: "index",
      code: "aaa222222222",
      codeComment: "frgrgt22222222",
      description: "string2222222222",
      title: "title222222222"
    }

    const options = getOptions("PATCH", params)

    axios(options)
      .then((results) => {
        console.log(results)
      })
      .catch((error) => {
        console.log("PATCHに失敗しました。↓がエラー結果です")
        console.log(error)
      })
  }

  const deleteDynamo = () => {
    const params = {
      index: "index",
      userId: userId
    }

    const options = getOptions("DELETE", params)

    axios(options)
      .then((results) => {
        console.log(results)
      })
      .catch((error) => {
        console.log("DELETEに失敗しました。↓がエラー結果です")
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <div>You are signed in</div>
      <button onClick={getUserId}>get userId</button>
      <hr></hr>
      <div>トークン周りの挙動が正常ならDBからアイテムが返ってくる</div>
      <button onClick={getDynamo}>get Dynamo</button>
      <button onClick={postDynamo}>post Dynamo</button>
      <button onClick={patchDynamo}>patch Dynamo</button>
      <button onClick={deleteDynamo}>delete Dynamo</button>
    </React.Fragment>
  )
}

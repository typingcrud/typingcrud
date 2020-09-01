import React, { useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAppSelector, useAppDispatch, actions, thunkActions } from 'state'

const GameList: React.FC = () => {
    const gameList = useAppSelector(state => state.gameList)
    const dispatch = useAppDispatch()

    const auth = useAppSelector(state => state.auth)

    const getOptions = (method: "GET" | "POST" | "PATCH" | "DELETE", params: any): AxiosRequestConfig => {
        return {
            method: method,
            params: params,
            url: process.env.REACT_APP_API_BASE + "game",
        }
    }

    const getDynamo = () => {
        const params = {
            userId: auth.userId,
            index: "",
            scanFlag: "0",
            filterTime: "0"
        }
        const options = getOptions("GET", params)
        axios(options)
            .then((results) => {
                console.log(results.data)
                //ここでstateを更新したい
            })
            .catch((error) => {
                console.error(error)
            })
    }
    useEffect(() => {
        console.log(auth)
        //ここはマウントされてuserIdがstoreに入るのを待ってから実行したい
        if (auth.userId !== "") {
            return getDynamo
        }
    }, [auth.userId])

    return (
        <div>{gameList.code}</div>
    )
}

export default GameList
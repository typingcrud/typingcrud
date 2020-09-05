import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { actions } from 'state'


export const updateTokens = createAsyncThunk<void, void, ThunkAPI>(
    'auth/updateTokens',
    async (_, thunkAPI) => {
        const { isSignIn, tokens } = thunkAPI.getState().auth
        if (!isSignIn && !tokens) {
            return
        }
        /*

        https://github.com/typingcrud/typingcrud-old/commit/d45cf0bc2e71b940061c7e6450f72a6b322eef3c
        ↑のコミットにトークン更新処理が書いてあるのでそれを参考に実装お願いします
        セッションを引数で受け取って処理するのが良いかなと思う
        ↓以降はestablishSessionからのコピペなんで適当
        
        const localStorageDatas = {
            idToken: localStorage.getItem('idToken'),
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            userId: localStorage.getItem("userId")
        }
        if (
            localStorageDatas.idToken !== null &&
            localStorageDatas.accessToken !== null &&
            localStorageDatas.refreshToken !== null &&
            localStorageDatas.userId !== null
        ) {
            thunkAPI.dispatch(actions.auth.setCognitoUser(true))
            thunkAPI.dispatch(actions.auth.setTokens({
                idToken: localStorageDatas.idToken,
                accessToken: localStorageDatas.accessToken,
                refreshToken: localStorageDatas.refreshToken
            }))
            thunkAPI.dispatch(actions.auth.setUserId(localStorageDatas.userId))

        } else {
            cognitoUser.getSession((err: Error, session: CognitoUserSession) => {
                if (err) {
                    alert(err.message || JSON.stringify(err))
                    return
                }
                const idToken = session.getIdToken().getJwtToken()
                const accessToken = session.getAccessToken().getJwtToken()
                const refreshToken = session.getRefreshToken().getToken()
                const userId = session.getIdToken().payload['custom:typing_userID']

                thunkAPI.dispatch(actions.auth.setCognitoUser(true))
                thunkAPI.dispatch(actions.auth.setTokens({
                    idToken: idToken,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }))
                thunkAPI.dispatch(actions.auth.setUserId(userId))

                localStorage.setItem('idToken', idToken)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('userId', userId)
            })
        }
        */
    }
)

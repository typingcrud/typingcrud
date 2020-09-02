import { createSlice } from '@reduxjs/toolkit'

type Game = {
    code: string
    codeComment: string
    createAt: string
    description: string
    index: string
    title: string
    updateAt: string
    userId: string
}

type GameList = Game[]

const initialState: GameList = []

const gameListSlice = createSlice({
    name: 'gameList',
    initialState,
    reducers: {
        reset: () => initialState,
    }
})

export default gameListSlice

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GameList = {
    code: string
    codeComment: string
    createAt: string
    description: string
    index: string
    title: string
    updateAt: string
    userId: string
}

const initialState: GameList = {
    code: "aa",
    codeComment: "",
    createAt: "",
    description: "",
    index: "",
    title: "",
    updateAt: "",
    userId: ""
}

const gameListSlice = createSlice({
    name: 'gameList',
    initialState,
    reducers: {
        reset: () => initialState,
        changeList: (_, action: PayloadAction<GameList>) => action.payload
    }
})

export default gameListSlice

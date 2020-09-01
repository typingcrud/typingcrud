import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import GamePlay from 'views/Game/GamePlay'

type GamePlay = {
    title: string
    description: string
    code: string
    codeComment: string
}

const initialState: GamePlay = {
    title: "",
    description: "",
    code: "",
    codeComment: "",
}

const gamePlaySlice = createSlice({
    name: 'gamePlay',
    initialState,
    reducers: {
        reset: () => initialState,
        changeForm: (_, action: PayloadAction<GamePlay>) => action.payload
    }
})

export default gamePlaySlice

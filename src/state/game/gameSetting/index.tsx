import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import GameSetting from 'views/Game/GameSetting'

type GameSetting = {
    title: string
    description: string
    code: string
    codeComment: string
}

const initialState: GameSetting = {
    title: "",
    description: "",
    code: "",
    codeComment: "",
}

const gameSettingSlice = createSlice({
    name: 'gameSetting',
    initialState,
    reducers: {
        reset: () => initialState,
        changeForm: (_, action: PayloadAction<GameSetting>) => action.payload
    }
})

export default gameSettingSlice

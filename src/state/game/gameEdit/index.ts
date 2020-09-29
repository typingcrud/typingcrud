import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GameForm } from 'state/game/gameForm'
import { getGame } from 'state/game/gameEdit/getGame'
import { submit } from 'state/game/gameEdit/submit'

type GameEdit = GameForm

const initialState: GameEdit = {
  title: '',
  description: '',
  code: '',
  codeComment: '',
}

const gameEditSlice = createSlice({
  name: 'gameEdit',
  initialState,
  reducers: {
    reset: () => initialState,
    changeForm: (_, action: PayloadAction<GameEdit>) => action.payload
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      const { code, codeComment, description, title } = action.payload ? action.payload : state
      state.title = title
      state.description = description
      state.code = code
      state.codeComment = codeComment
    })
  }
})

export const gameEditThunk = {
  getGame, submit
}

export default gameEditSlice

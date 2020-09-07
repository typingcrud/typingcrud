import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getGame } from 'state/game/gamePlay/getGame'
import { Game } from 'state/game/gameList'

type Params = {
  cursorPos: number
  cursorRow: number
  gameOver: boolean
  code: {
    after: string
    current: string
    before: string
  }
}

type GamePlay = {
  game: Omit<Game, "userId">
  params: Params
}

const initialState: GamePlay = {
  game: {
    index: '',
    title: '',
    description: '',
    code: '',
    codeComment: '',
    createAt: '',
    updateAt: ''
  },
  params: {
    cursorPos: 0,
    cursorRow: 0,
    gameOver: false,
    code: {
      after: '',
      current: '',
      before: ''
    }
  }
}

const gamePlaySlice = createSlice({
  name: 'gamePlay',
  initialState,
  reducers: {
    reset: () => initialState,
    setCursorPos: (state, action: PayloadAction<GamePlay['params']['cursorPos']>) => {
      state.params.cursorPos = action.payload
      state.params.code = {
        after: state.game.code.slice(0, action.payload),
        current: state.game.code.slice(action.payload, action.payload + 1),
        before: state.game.code.slice(action.payload + 1)
      }
    },
    setCursorRow: (state, action: PayloadAction<GamePlay['params']['cursorRow']>) => {
      state.params.cursorRow = action.payload
    },
    setGameOver: (state, action: PayloadAction<GamePlay['params']['gameOver']>) => {
      state.params.gameOver = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.game = action.payload ? action.payload : state.game
      state.params.code = {
        after: state.game.code.slice(0, 0),
        current: state.game.code.slice(0, 1),
        before: state.game.code.slice(1)
      }
    })
  }
})

export const gamePlayThunk = {
  getGame,
}

export default gamePlaySlice

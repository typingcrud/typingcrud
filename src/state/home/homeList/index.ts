import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getHomeGames } from 'state/home/homeList/getHomeGames'

type homeList = {
  list: Omit<App.Game, 'userId'>[]
  page: number
}

const initialState: homeList = {
  list: [],
  page: 1
}

const homeListSlice = createSlice({
  name: 'homeList',
  initialState,
  reducers: {
    reset: () => initialState,
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getHomeGames.fulfilled, (state, action) => {
      state.list = action.payload ? action.payload : state.list
    })
  }
})

export const homeListThunk = {
  getHomeGames,
}

export default homeListSlice

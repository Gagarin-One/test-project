import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board } from '../types/board.types'
import { getBoards } from '../api/boardApi'

export const fetchBoards = createAsyncThunk('boards/fetchAll', async () => {
  const response = await getBoards()
  return response.data
})

interface BoardState {
  items: Board[]
  loading: boolean
  error: string | null
}

const initialState: BoardState = {
  items: [],
  loading: false,
  error: null,
}

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load boards'
      })
  },
})

export const boardReducer = boardSlice.reducer
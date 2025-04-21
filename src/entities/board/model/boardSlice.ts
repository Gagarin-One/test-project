import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { Board } from '../types/board.types'
import { getBoards } from '../api/boardApi'

// Async action to fetch boards list
export const fetchBoards = createAsyncThunk('boards', async () => {
  const res = await getBoards()
  return res.data.data
})

// Define the state type for boards
interface BoardState {
  items: Board[]
  loading: boolean
  error: string | null
}

// Initial state
const initialState: BoardState = {
  items: [],
  loading: false,
  error: null,
}

// Board slice
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
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load boards'
      })
  },
})

// Export the reducer
export const boardReducer = boardSlice.reducer
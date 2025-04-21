import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.types'
import { getUsers } from '../api/userApi'


interface UserState {
  items: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await getUsers()
  return res.data.data
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки пользователей'
      })
  },
})

export const userReducer = userSlice.reducer

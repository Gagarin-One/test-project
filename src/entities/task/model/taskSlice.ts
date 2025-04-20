import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types/task.types'
import { getTasks } from '../api/taskApi'

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await getTasks()
  return response.data
})

export const fetchTasksByBoardId = createAsyncThunk(
  'tasks/fetchByBoardId',
  async (boardId: string) => {
//    const response = await axios.get<Task[]>(`/tasks?boardId=${boardId}`)
    return response.data
  }
)


interface TaskState {
  items: Task[]
  loading: boolean
  error: string | null
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load tasks'
      })
  },
})

export const taskReducer = taskSlice.reducer

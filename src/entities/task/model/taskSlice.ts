import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types/task.types'
import {
  getTasks,
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
} from '../api/taskApi'

export const fetchAllTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const res = await getTasks()
  return res.data
})

export const fetchTasksByBoardId = createAsyncThunk(
  'tasks/fetchByBoard',
  async (boardId: number) => {
    const res = await getTasksByBoardId(boardId)
    return res.data
  }
)

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (taskId: number) => {
    const res = await getTaskById(taskId)
    return res.data
  }
)

export const createNewTask = createAsyncThunk(
  'tasks/create',
  async (data: Parameters<typeof createTask>[0], { dispatch }) => {
    await createTask(data)
    dispatch(fetchAllTasks())
  }
)

export const updateExistingTask = createAsyncThunk(
  'tasks/update',
  async ({ taskId, data }: { taskId: number; data: Parameters<typeof updateTask>[1] }, { dispatch }) => {
    await updateTask(taskId, data)
    dispatch(fetchAllTasks())
  }
)

export const changeTaskStatus = createAsyncThunk(
  'tasks/changeStatus',
  async ({ taskId, status }: { taskId: number; status: 'To Do' | 'In Progress' | 'Done' }, { dispatch }) => {
    await updateTaskStatus(taskId, status)
    dispatch(fetchAllTasks())
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
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load tasks'
      })
  },
})

export const taskReducer = taskSlice.reducer

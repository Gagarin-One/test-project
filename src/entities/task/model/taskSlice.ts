// Imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task.types';
import {
  getTasks,
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
} from '../api/taskApi';

// Thunk to fetch all tasks
export const fetchAllTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const res = await getTasks();
  return res.data.data;
});

// Thunk to fetch tasks for a specific board
export const fetchTasksByBoardId = createAsyncThunk(
  'tasks/fetchByBoard',
  async (boardId: number) => {
    const res = await getTasksByBoardId(boardId);
    return res.data.data;
  },
);

// Thunk to fetch a single task by ID
export const fetchTaskById = createAsyncThunk('tasks/fetchById', async (taskId: number) => {
  const res = await getTaskById(taskId);
  return res.data.data;
});

// Thunk to create a new task and refresh task lists
export const createNewTask = createAsyncThunk(
  'tasks/create',
  async (
    data: Parameters<typeof createTask>[0],
    { dispatch }
  ) => {
    await createTask(data);
    await dispatch(fetchTasksByBoardId(data.boardId));
    await dispatch(fetchAllTasks());
  }
);

// Thunk to update a task and refresh task lists
export const updateExistingTask = createAsyncThunk(
  'tasks/update',
  async (
    { taskId, data, boardId }: { taskId: number; data: Parameters<typeof updateTask>[1]; boardId: number },
    { dispatch },
  ) => {
    await updateTask(taskId, data);
    await dispatch(fetchTasksByBoardId(boardId));
    await dispatch(fetchAllTasks());
  },
);

// Thunk to change task status and refresh board tasks
export const changeTaskStatus = createAsyncThunk(
  'tasks/changeStatus',
  async (
    { taskId, status, boardId }: { taskId: number; status: 'Backlog' | 'InProgress' | 'Done'; boardId: number },
    { dispatch }
  ) => {
    await updateTaskStatus(taskId, status);
    await dispatch(fetchTasksByBoardId(boardId));
  }
);

// Task slice state type
interface TaskState {
  items: Task[];        // All tasks
  boardItems: Task[];   // Tasks by board
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TaskState = {
  items: [],
  boardItems: [],
  loading: false,
  error: null,
};

// Task slice with async reducers
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load tasks';
      })

      // Tasks by board
      .addCase(fetchTasksByBoardId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByBoardId.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.boardItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksByBoardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load tasks by board';
      });
  },
});

// Export reducer
export const taskReducer = taskSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import { taskReducer } from '../../entities/task/model/taskSlice'
import { boardReducer } from '../../entities/board/model/boardSlice'
import { userReducer } from '../../entities/user/model/userSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    boards: boardReducer,
    users: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
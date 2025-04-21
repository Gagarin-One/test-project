import axios from 'axios'

export interface Board {
  id: number
  name: string
  description: string
  taskCount: number
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
})

// Получить список досок
export const getBoards = () => api.get<Board[]>('/boards')

// Получить задачи по доске (аналогично getTasksByBoardId)
export const getBoardTasks = (boardId: number) => api.get(`/boards/${boardId}`)
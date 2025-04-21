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

//GET request to '/boards'
export const getBoards = () => api.get<{data:Board[]}>('/boards')

//GET request to '/boards/:id
export const getBoardTasks = (boardId: number) => api.get(`/boards/${boardId}`)
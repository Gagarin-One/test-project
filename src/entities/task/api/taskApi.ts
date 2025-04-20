import axios from 'axios'
import { Task } from '../types/task.types'

const api = axios.create({
  baseURL:'http://localhost:3000/api',
})

export const getTasks = () => api.get<Task[]>('/tasks')
export const getTaskById = (id: string) => api.get<Task>(`/tasks/${id}`)

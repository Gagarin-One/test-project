import axios from 'axios';
import { Task } from '../types/task.types';


const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
})

// Получить все задачи
export const getTasks = () => api.get<Task[]>('/tasks')

// Получить задачи по boardId
export const getTasksByBoardId = (boardId: number) => api.get<Task[]>(`/boards/${boardId}`)

// Получить задачу по ID
export const getTaskById = (taskId: number) => api.get<Task>(`/tasks/${taskId}`)

// Создать задачу
export const createTask = (data: {
  assigneeId: number
  boardId: number
  description: string
  priority: 'Low' | 'Medium' | 'High'
  title: string
}) => api.post<{ id: number }>('/tasks/create', data)

// Обновить задачу по ID
export const updateTask = (taskId: number, data: {
  assigneeId: number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'To Do' | 'In Progress' | 'Done'
}) => api.put(`/tasks/update/${taskId}`, data)

// Обновить только статус задачи


export const updateTaskStatus = (taskId: number, status: string) =>
  api.put(`/tasks/updateStatus/${taskId}`, { status })

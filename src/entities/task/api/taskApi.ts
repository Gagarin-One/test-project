import axios from 'axios';
import { Task } from '../types/task.types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getTasks = () => api.get<Task[]>('/tasks');

export const getTaskById = (id: string) => api.get<Task>(`/tasks/${id}`);

export const createTask = (data: Omit<Task, 'id'>) => api.post<Task>('/tasks', data);

export const updateTask = (id: string, data: Partial<Task>) => api.put<Task>(`/tasks/${id}`, data);

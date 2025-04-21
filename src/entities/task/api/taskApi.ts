// Import axios and Task type
import axios from 'axios';
import { Task } from '../types/task.types';

// Create axios instance with base API URL
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Get all tasks
export const getTasks = () => api.get<{ data: Task[] }>('/tasks');

// Get tasks by board ID
export const getTasksByBoardId = (boardId: number) =>
  api.get<{ data: Task[] }>(`/boards/${boardId}`);

// Get a single task by ID
export const getTaskById = (taskId: number) =>
  api.get<{ data: Task }>(`/tasks/${taskId}`);

// Create a new task
export const createTask = (data: {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  title: string;
}) => api.post('/tasks/create', data);

// Update task details
export const updateTask = (
  taskId: number,
  data: {
    assigneeId: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Backlog' | 'InProgress' | 'Done';
  },
) => api.put(`/tasks/update/${taskId}`, data);

// Update task status only
export const updateTaskStatus = (taskId: number, status: string) =>
  api.put(`/tasks/updateStatus/${taskId}`, { status });

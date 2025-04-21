import { Task } from "../../entities/task/types/task.types"


export interface TaskFormValues {
  title: string
  description: string
  priority: Task['priority']
  status: Task['status']
  executor: string
  boardId: string
}

export const defaultFormValues: TaskFormValues = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  executor: '',
  boardId: '',
}
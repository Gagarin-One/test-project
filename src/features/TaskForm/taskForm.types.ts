import { Task } from "../../entities/task/types/task.types"


export interface TaskFormValues {
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'To Do' | 'In Progress' | 'Done'
  assigneeId: number
  boardId: number
}

export const defaultFormValues: TaskFormValues = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'To Do',
  assigneeId: 0,
  boardId: 0,
}
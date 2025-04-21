export interface TaskFormValues {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
  assigneeId: number;
  boardId: number;
}
export const defaultFormValues: TaskFormValues = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Backlog',
  assigneeId: 0,
  boardId: 0,
};

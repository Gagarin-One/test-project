import { useState } from 'react'
import { TaskFormValues } from './taskForm.types'
import { InputField } from '@/shared/ui/InputField/InputField'
import { SelectField } from '@/shared/ui/SelectField/SelectField'
import { Button } from '@/shared/ui/Button/Button'
import styles from './TaskForm.module.scss'

interface Props {
  onSubmit: (data: TaskFormValues) => void
  initialValues?: TaskFormValues
}

const priorityOptions = [
  { label: 'Низкий', value: 'low' },
  { label: 'Средний', value: 'medium' },
  { label: 'Высокий', value: 'high' },
]

const statusOptions = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]

export const TaskForm = ({ onSubmit, initialValues }: Props) => {
  const [formData, setFormData] = useState<TaskFormValues>(initialValues || {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    executor: '',
    boardId: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputField
        label="Название задачи"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label className={styles.wrapper}>
        <span className={styles.label}>Описание</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
        />
      </label>

      <SelectField
        label="Приоритет"
        name="priority"
        value={formData.priority}
        options={priorityOptions}
        onChange={handleChange}
      />

      <SelectField
        label="Статус"
        name="status"
        value={formData.status}
        options={statusOptions}
        onChange={handleChange}
      />

      <InputField
        label="Исполнитель"
        name="executor"
        value={formData.executor}
        onChange={handleChange}
      />

      <InputField
        label="ID доски"
        name="boardId"
        value={formData.boardId}
        onChange={handleChange}
        required
      />

      <Button type="submit">Сохранить</Button>
    </form>
  )
}

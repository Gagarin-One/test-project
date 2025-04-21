import { TaskFormValues } from './taskForm.types'
import { TaskForm } from './TaskForm'
import styles from './taskFormModal.module.scss'
import { useAppDispatch } from '../../shared/hooks'
import { createNewTask, updateExistingTask } from '../../entities/task/model/taskSlice'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialValues?: TaskFormValues & { id?: string }
}

export const TaskFormModal = ({ isOpen, onClose, initialValues }: Props) => {
  const dispatch = useAppDispatch()

  if (!isOpen) return null

  const handleSubmit = async (data: TaskFormValues) => {
    if (initialValues?.id) {
      await dispatch(updateExistingTask(initialValues.id, data))
    } else {
      await dispatch(createNewTask(data))
    }
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialValues?.id ? 'Редактировать задачу' : 'Создать задачу'}</h2>
        <TaskForm onSubmit={handleSubmit} initialValues={initialValues} />
        <button onClick={onClose} className={styles.closeButton}>Закрыть</button>
      </div>
    </div>
  )
}

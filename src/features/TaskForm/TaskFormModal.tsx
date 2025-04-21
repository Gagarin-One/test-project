import { createNewTask, updateExistingTask } from '../../entities/task/model/taskSlice';
import { useAppDispatch } from '../../shared/hooks';
import { TaskForm } from './TaskForm';
import styles from './TaskFormModal.module.scss';
import { TaskFormValues } from './taskForm.types';

interface Props {
  isOpen: boolean; // Flag to determine if modal is open
  onClose: () => void; // Function to close the modal
  initialValues?: Partial<TaskFormValues> & { id?: number }; // Initial values for editing an existing task
  isBoardPage?: boolean; // Flag to disable board field on board page
}

export const TaskFormModal = ({ isOpen, onClose, initialValues, isBoardPage }: Props) => {
  const dispatch = useAppDispatch();

  // If modal is not open, return null to render nothing
  if (!isOpen) return null;

  // Handle form submission: either create or update a task
  const handleSubmit = (data: TaskFormValues) => {
    const { boardId } = data;
    if (initialValues?.id) {
      dispatch(updateExistingTask({ taskId: initialValues.id, data, boardId })); // Update task if id exists
    } else {
      const { title, description, priority, boardId, assigneeId } = data;
      dispatch(createNewTask({ title, description, priority, boardId, assigneeId })); // Create new task
    }
    onClose(); // Close the modal after submission
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{initialValues?.id ? 'Редактировать задачу' : 'Создать задачу'}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <TaskForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          isEditMode={Boolean(initialValues?.id)} // Enable edit mode if id exists
          readonlyBoardId={isBoardPage} // Disable board field on board page
          onClose={onClose}
        />
      </div>
    </div>
  );
};

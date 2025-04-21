import { Link } from 'react-router-dom';
import { createNewTask, updateExistingTask } from '../../entities/task/model/taskSlice';
import { useAppDispatch } from '../../shared/hooks';
import { TaskForm } from './TaskForm';
import styles from './TaskFormModal.module.scss';

import { TaskFormValues } from './taskForm.types';
import { Button } from '../../shared/ui/Button/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<TaskFormValues> & { id?: number };
  isBoardPage?: boolean;
}

export const TaskFormModal = ({ isOpen, onClose, initialValues, isBoardPage }: Props) => {
  const dispatch = useAppDispatch();
  const isEditMode = Boolean(initialValues?.id);
  if (!isOpen) return null;

  const handleSubmit = (data: TaskFormValues) => {
    const { boardId } = data;
    if (initialValues?.id) {
      dispatch(updateExistingTask({ taskId: initialValues.id, data, boardId }));
    } else {
      const { title, description, priority, boardId, assigneeId } = data;
      dispatch(createNewTask({ title, description, priority, boardId, assigneeId }));
    }
    onClose();
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
          isEditMode={Boolean(initialValues?.id)}
          readonlyBoardId={isBoardPage}
          onClose={onClose}
        />

        
      </div>
    </div>
  );
};

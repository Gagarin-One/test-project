import { useEffect, useState } from 'react';
import { TaskFormValues } from './taskForm.types';

import styles from './TaskForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { fetchUsers } from '../../entities/user/model/userSlice';
import { InputField } from '../../shared/ui/InputField';
import { SelectField } from '../../shared/ui/SelectField';
import { Button } from '../../shared/ui/Button';
import { fetchBoards } from '../../entities/board/model/boardSlice';
import { Link } from 'react-router-dom';

interface Props {
  onSubmit: (values: TaskFormValues) => void;
  initialValues?: Partial<TaskFormValues>;
  readonlyBoardId?: boolean;
  isEditMode?: boolean;
  onClose: () => void;
}

const priorities = [
  { label: 'Низкий', value: 'Low' },
  { label: 'Средний', value: 'Medium' },
  { label: 'Высокий', value: 'High' },
];

const statuses = [
  { label: 'To Do', value: 'Backlog' },
  { label: 'In Progress', value: 'InProgress' },
  { label: 'Done', value: 'Done' },
];

export const TaskForm = ({
  onSubmit,
  initialValues,
  readonlyBoardId,
  isEditMode,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.items);
  const boards = useAppSelector((state) => state.boards.items);

  // Initial form data with optional initial values
  const [formData, setFormData] = useState<TaskFormValues>({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    priority: initialValues?.priority || 'Medium',
    status: initialValues?.status || 'Backlog',
    assigneeId: initialValues?.assigneeId || 0,
    boardId: initialValues?.boardId || 0,
  });

  // Fetch users and boards on component mount
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBoards());
  }, [dispatch]);

  // Set assignee if not provided and users are available
  useEffect(() => {
    if (!initialValues?.assigneeId && users.length > 0) {
      setFormData((prev) => ({
        ...prev,
        assigneeId: users[0].id,
      }));
    }
  }, [users]);

  // Set board if not provided and boards are available
  useEffect(() => {
    if (!initialValues?.boardId && boards.length > 0) {
      setFormData((prev) => ({
        ...prev,
        boardId: boards[0].id,
      }));
    }
  }, [boards]);

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'assigneeId' || name === 'boardId' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputField
        name="title"
        label="Название задачи"
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
          required
        />
      </label>

      <SelectField
        name="priority"
        label="Приоритет"
        value={formData.priority}
        options={priorities}
        onChange={handleChange}
      />
      <SelectField
        name="status"
        label="Статус"
        value={formData.status}
        options={statuses}
        disabled={!isEditMode}
        onChange={handleChange}
      />

      <SelectField
        name="assigneeId"
        label="Исполнитель"
        value={formData.assigneeId.toString()}
        options={users.map((u) => ({ label: u.fullName, value: u.id.toString() }))}
        onChange={handleChange}
      />

      <SelectField
        name="boardId"
        label="Проект"
        value={formData.boardId.toString()}
        options={boards.map((b) => ({
          label: b.name,
          value: b.id.toString(),
        }))}
        onChange={handleChange}
        disabled={readonlyBoardId}
      />
      <div className={styles.actions}>
        {initialValues?.boardId && (
          <Link
            className={styles.linkToBoard}
            to={`/board/${initialValues.boardId}`}
            onClick={onClose}>
            Перейти на доску
          </Link>
        )}
        <Button type="submit">{isEditMode ? 'Обновить' : 'Создать'}</Button>
      </div>
    </form>
  );
};

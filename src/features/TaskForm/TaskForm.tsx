import { useState, useEffect } from 'react';
import { TaskFormValues } from './taskForm.types';

import styles from './TaskForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import { InputField } from '../../shared/ui/InputField';
import { SelectField } from '../../shared/ui/SelectField';
import { Button } from '../../shared/ui/Button/Button';
import { fetchUsers } from '../../entities/user/model/userSlice';

interface Props {
  onSubmit: (data: TaskFormValues) => void;
  initialValues?: TaskFormValues;
}

const priorityOptions = [
  { label: 'Низкий', value: 'Low' },
  { label: 'Средний', value: 'Medium' },
  { label: 'Высокий', value: 'High' },
];

const statusOptions = [
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' },
];

export const TaskForm = ({ onSubmit, initialValues }: Props) => {
  const [formData, setFormData] = useState<TaskFormValues>(
    initialValues || {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'To Do',
      assigneeId: 0,
      boardId: 0,
    },
  );

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.items);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'assigneeId' || name === 'boardId' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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

      <SelectField
        label="Исполнитель"
        name="assigneeId"
        value={formData.assigneeId.toString()}
        options={users.map((user) => ({ label: user.fullName, value: user.id.toString() }))}
        onChange={handleChange}
      />

      <InputField
        label="ID доски"
        name="boardId"
        type="number"
        value={formData.boardId.toString()}
        onChange={handleChange}
        required
      />

      <Button type="submit">Сохранить</Button>
    </form>
  );
};

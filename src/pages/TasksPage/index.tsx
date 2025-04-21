import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './TaskPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Task } from '../../entities/task/types/task.types';
import { fetchAllTasks } from '../../entities/task/model/taskSlice';
import { fetchUsers } from '../../entities/user/model/userSlice';
import { fetchBoards } from '../../entities/board/model/boardSlice';

import { TaskRow } from '../../widgets/TaskRow/TaskRow';
import { TaskFormModal } from '../../features/TaskForm/TaskFormModal';
import { Button } from '../../shared/ui/Button/Button';

type ContextType = {
  onCreateTask?: () => void;
};

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const loading = useAppSelector((state) => state.tasks.loading);
  const boards = useAppSelector((state) => state.boards.items);
  const { onCreateTask } = useOutletContext<ContextType>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [board, setBoard] = useState('');

  useEffect(() => {
    dispatch(fetchAllTasks());
    dispatch(fetchUsers());
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  const closeModal = () => {
    setFormOpen(false);
    setSelectedTask(null);
    dispatch(fetchAllTasks());
  };

  const filtered = tasks.filter((task) => {
    const query = search.toLowerCase();
    const inTitle = task.title.toLowerCase().includes(query);
    const inAssignee = task.assignee?.fullName.toLowerCase().includes(query);

    return (
      (inTitle || inAssignee) &&
      (!status || task.status === status) &&
      (!board || task.boardId === Number(board))
    );
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Все задачи</h1>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Все статусы</option>
          <option value="Backlog">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select value={board} onChange={(e) => setBoard(e.target.value)}>
          <option value="">Все доски</option>
          {boards.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className={styles.list}>
          {filtered.map((task) => (
            <TaskRow key={task.id} task={task} onClick={() => handleClick(task)} />
          ))}
        </div>
      )}
      {onCreateTask && !loading && (
        <div className={styles.footer}>
          <Button onClick={onCreateTask}>Создать задачу</Button>
        </div>
      )}

      <TaskFormModal
        isOpen={formOpen}
        onClose={closeModal}
        initialValues={
          selectedTask
            ? {
                id: selectedTask.id,
                title: selectedTask.title,
                description: selectedTask.description,
                assigneeId: selectedTask.assignee.id,
                boardId: selectedTask.boardId,
                priority: selectedTask.priority,
                status: selectedTask.status,
              }
            : undefined
        }
        isBoardPage={false}
      />
    </div>
  );
};

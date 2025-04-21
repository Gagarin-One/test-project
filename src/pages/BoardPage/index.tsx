import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import styles from './BoardPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { fetchTasksByBoardId, changeTaskStatus } from '../../entities/task/model/taskSlice';
import { Task } from '../../entities/task/types/task.types';
import { BoardColumn } from '../../widgets/BoardColumns';
import { TaskFormModal } from '../../features/TaskForm/TaskFormModal';
import { fetchBoards } from '../../entities/board/model/boardSlice';

const statusList = ['Backlog', 'InProgress', 'Done'] as const;

// Mapping statuses to user-friendly titles
const statusTitles: Record<(typeof statusList)[number], string> = {
  Backlog: 'To Do',
  InProgress: 'In Progress',
  Done: 'Done',
};

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>(); // Get board ID from URL params
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.boardItems); // Get tasks for the current board

  const [formOpen, setFormOpen] = useState(false); // Track if the task form modal is open
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Track selected task for editing
  const boards = useAppSelector((state) => state.boards.items); // Get all boards from state

  // Fetch tasks when board ID changes
  useEffect(() => {
    if (id) dispatch(fetchTasksByBoardId(Number(id)));
  }, [dispatch, id]);

  // Fetch boards once component is mounted
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  // Open the task form modal with selected task
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedTask(null);
  };

  // Handle drag and drop event to change task status
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !id) return; // No valid target for drag

    const fromStatus = active.data.current?.status;
    const toStatus = over.id;

    // Only change status if it has changed
    if (fromStatus && fromStatus !== toStatus) {
      dispatch(
        changeTaskStatus({
          taskId: Number(active.id),
          status: toStatus as 'Backlog' | 'InProgress' | 'Done',
          boardId: Number(id),
        }),
      );
    }
  };

  const boardId = Number(id);
  const board = boards.find((b) => b.id === boardId); // Find the board based on ID

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{board?.name}</h1>

      <DndContext onDragEnd={handleDragEnd}>
        {' '}
        {/* Drag-and-drop context for tasks */}
        <div className={styles.columns}>
          {/* Render columns based on task statuses */}
          {statusList.map((status) => (
            <BoardColumn
              key={status}
              id={status}
              title={statusTitles[status]}
              tasks={tasks.filter((t) => t.status === status)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      </DndContext>

      {/* Task form modal for editing or creating tasks */}
      <TaskFormModal
        isOpen={formOpen}
        onClose={handleCloseModal}
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
            : { boardId: Number(id) }
        }
        isBoardPage
      />
    </div>
  );
};

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

import styles from './BoardPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import {
  fetchTasksByBoardId,
  changeTaskStatus,
} from '../../entities/task/model/taskSlice'
import { Task } from '../../entities/task/types/task.types'
import { BoardColumn } from '../../widgets/BoardColumns/BoardColumn'
import { TaskFormModal } from '../../features/TaskForm/TaskFormModal'
import { fetchBoards } from '../../entities/board/model/boardSlice'

const statusList = ['Backlog', 'InProgress', 'Done'] as const

const statusTitles: Record<typeof statusList[number], string> = {
  Backlog: 'To Do',
  InProgress: 'In Progress',
  Done: 'Done',
};



export const BoardPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.boardItems)

  const [formOpen, setFormOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const boards = useAppSelector((state) => state.boards.items)


  useEffect(() => {
    if (id) dispatch(fetchTasksByBoardId(Number(id)))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setFormOpen(true)
  }

  const handleCloseModal = () => {
    setFormOpen(false)
    setSelectedTask(null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || !id) return

    const fromStatus = active.data.current?.status
    const toStatus = over.id

    if (fromStatus && fromStatus !== toStatus) {
      dispatch(
        changeTaskStatus({
          taskId: Number(active.id),
          status: toStatus,
          boardId: Number(id),
        })
      )
    }
  }

  const boardId = Number(id)
  const board = boards.find((b) => b.id === boardId)


  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{board?.name}</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.columns}>
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
  )
}

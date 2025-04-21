import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { DndContext } from '@dnd-kit/core'

import styles from './BoardPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { changeTaskStatus, fetchTasksByBoardId } from '../../entities/task/model/taskSlice'
import { BoardColumn } from '../../widgets/BoardColumns/BoardColumn'

const statusList = ['Backlog', 'InProgress', 'Done'] as const

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.items)

  useEffect(() => {
    if (id) dispatch(fetchTasksByBoardId(Number(id)))
  }, [dispatch, id])

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.data.current?.status !== over.id) {
      dispatch(
        changeTaskStatus({
          taskId: Number(active.id),
          status: over.id,
          boardId: Number(id), 
        })
      );
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Доска #{id}</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.columns}>
          {statusList.map((status) => (
            <BoardColumn
              key={status}
              id={status}
              title={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

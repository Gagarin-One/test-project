import { useDroppable } from '@dnd-kit/core'

import styles from './BoardColumn.module.scss'
import { Task } from '../../entities/task/types/task.types'
import { BoardTaskCard } from '../../features/BoardTaskCard/BoardTaskCard'

interface Props {
  id: string
  title: string
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}
export const BoardColumn = ({ id, title, tasks, onTaskClick }: Props) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={styles.column}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <BoardTaskCard key={task.id} task={task} onClick={() => onTaskClick?.(task)} />
        ))}
      </div>
    </div>
  )
}

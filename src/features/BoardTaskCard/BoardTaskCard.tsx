import { useDraggable } from '@dnd-kit/core'

import styles from './BoardTaskCard.module.scss'
import { Task } from '../../entities/task/types/task.types'

export const BoardTaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
    data: { status: task.status },
  })

  return (
    <div ref={setNodeRef} className={styles.card} {...listeners} {...attributes}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.description}>{task.description}</div>
    </div>
  )
}

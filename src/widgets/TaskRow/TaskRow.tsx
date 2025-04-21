import { Task } from '../../entities/task/types/task.types'
import styles from './TaskRow.module.scss'


interface Props {
  task: Task
  onClick: () => void
}

export const TaskRow = ({ task, onClick }: Props) => {
  return (
    <div className={styles.row} onClick={onClick}>
      <div className={styles.title}>{task.title}</div>
    </div>
  )
}

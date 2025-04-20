import { Task } from "../../entities/task/types/task.types"
import { BoardColumn } from "./BoardColumn"



const statuses = ['todo', 'in_progress', 'done'] as const

interface Props {
  tasks: Task[]
}

export const BoardColumns = ({ tasks }: Props) => {
  return (
    <div >
      {statuses.map((status) => (
        <BoardColumn
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
        />
      ))}
    </div>
  )
}
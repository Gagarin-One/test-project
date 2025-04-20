
import { Task } from "../../entities/task/types/task.types"
import { BoardTaskCard } from "../../features/BoardTaskCard/BoardTaskCard"


interface Props {
  status: string
  tasks: Task[]
}

export const BoardColumn = ({ status, tasks }: Props) => (
  <div >
    <h2>{status.toUpperCase()}</h2>
    <div >
      {tasks.map((task) => (
        <BoardTaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
)

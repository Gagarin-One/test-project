import { Task } from "../../entities/task/types/task.types"


export const BoardTaskCard = ({ task }: { task: Task }) => {
  return (
    <div >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Исполнитель: {task.executor}</small>
    </div>
  )
}
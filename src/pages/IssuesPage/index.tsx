import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { fetchAllTasks } from '../../entities/task/model/taskSlice'




export const IssuesPage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.items)
  const loading = useAppSelector((state) => state.tasks.loading)

  useEffect(() => {
    dispatch(fetchAllTasks())
  }, [dispatch])

  return (
    <div>
      <h1>Все задачи</h1>
      {loading ? <p>Загрузка...</p> : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
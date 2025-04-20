import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { fetchTasksByBoardId } from '../../entities/task/model/taskSlice'
import { BoardColumns } from '../../widgets/BoardColumns/BoardColumns'




export const BoardPage = () => {
  const { id: boardId } = useParams()
  const dispatch = useAppDispatch()

  const tasks = useAppSelector((state) => state.tasks.items)
  const loading = useAppSelector((state) => state.tasks.loading)

  useEffect(() => {
    if (boardId) dispatch(fetchTasksByBoardId(boardId))
  }, [dispatch, boardId])

  return (
    <div>
      <h1>Доска #{boardId}</h1>
      {loading ? <p>Загрузка...</p> : <BoardColumns tasks={tasks} />}
    </div>
  )
}
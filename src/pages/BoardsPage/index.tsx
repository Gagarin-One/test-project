import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { fetchBoards } from '../../entities/board/model/boardSlice'
import { BoardCard } from '../../entities/board/ui/BoardCard'

export const BoardsPage = () => {
  const dispatch = useAppDispatch()
  const boards = useAppSelector((state) => state.boards.items)
  const loading = useAppSelector((state) => state.boards.loading)

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  return (
    <div>
      <h1>Список досок</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div >
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  )
}
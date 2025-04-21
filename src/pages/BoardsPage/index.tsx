import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { fetchBoards } from '../../entities/board/model/boardSlice'
import { BoardCard } from '../../entities/board/ui/BoardCard'

import styles from './BoardsPage.module.scss'

export const BoardsPage = () => {
  const dispatch = useAppDispatch()
  const boards = useAppSelector((state) => state.boards.items)
  const loading = useAppSelector((state) => state.boards.loading)

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Список досок</h1>
      {loading ? (
        <p className={styles.loader}>Загрузка...</p>
      ) : boards.length === 0 ? (
        <p className={styles.empty}>Нет досок</p>
      ) : (
        <div className={styles.grid}>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  )
}

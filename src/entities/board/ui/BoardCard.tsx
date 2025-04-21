import { Board } from '../types/board.types'
import styles from './BoardCard.module.scss'

import { Link } from 'react-router-dom'

interface Props {
  board: Board
}

export const BoardCard = ({ board }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{board.name}</div>
      <Link to={`/board/${board.id}`} className={styles.link}>
        Перейти к доске →
      </Link>
    </div>
  )
}

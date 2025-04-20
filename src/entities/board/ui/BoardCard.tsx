import { Board } from '../types/board.types'
import { Link } from 'react-router-dom'


export const BoardCard = ({ board }: { board: Board }) => (
  <Link to={`/board/${board.id}`} >
    <h3>{board.title}</h3>
    {board.description && <p>{board.description}</p>}
  </Link>
)
import axios from 'axios'
import { Board } from '../types/board.types'

const api = axios.create({
  baseURL: 'http://localhost:3000/',
})

export const getBoards = () => api.get<Board[]>('/boards')
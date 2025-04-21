import axios from 'axios'
import { User } from '../types/user.types'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
})
export const getUsers = () => api.get<User[]>('/users')

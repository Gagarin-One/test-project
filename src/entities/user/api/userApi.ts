import axios from 'axios'
import { User } from '../types/user.types'


export const getUsers = () => axios.get<User[]>('/users')

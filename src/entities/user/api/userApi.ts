// Import axios and User type
import axios from 'axios';
import { User } from '../types/user.types';

// Create axios instance with base API URL
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Get all users
export const getUsers = () => api.get<{ data: User[] }>('/users');

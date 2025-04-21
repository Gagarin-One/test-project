// Import necessary functions from Redux Toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Import User type and getUsers API function
import { User } from '../types/user.types';
import { getUsers } from '../api/userApi';

// Define the state structure for users
interface UserState {
  items: User[]; // List of users
  loading: boolean; // Loading state
  error: string | null; // Error message or null
}

// Initial state for the users slice
const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
};

// Async action to fetch users
export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await getUsers();
  return res.data.data;
});

// Create the users slice with reducers for async actions
const userSlice = createSlice({
  name: 'users', // Name of the slice
  initialState, // Initial state
  reducers: {}, // No custom reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update user list when fetch succeeds
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users'; // Set error message
      });
  },
});

// Export the user reducer
export const userReducer = userSlice.reducer;

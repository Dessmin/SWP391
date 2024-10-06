import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './features/userSlice'

const userFromStorage = JSON.parse(localStorage.getItem('user') || 'null'); // Nếu không có, gán null

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  preloadedState: {
    user: userFromStorage, // Khôi phục state người dùng từ localStorage
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
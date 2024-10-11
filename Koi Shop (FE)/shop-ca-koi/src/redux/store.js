import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';

const userFromStorage = JSON.parse(sessionStorage.getItem('user') || 'null'); // Nếu không có, gán null

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  preloadedState: {
    user: userFromStorage, // Khôi phục state người dùng từ sessionStorage
  },
});
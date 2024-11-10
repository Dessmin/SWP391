import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';
import { searchSlice } from './features/searchSlice';

const userFromStorage = JSON.parse(sessionStorage.getItem('user') || 'null'); 

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
  },
  preloadedState: {
    user: userFromStorage, 
  },
});

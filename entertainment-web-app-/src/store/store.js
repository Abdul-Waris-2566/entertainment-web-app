import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer, // Add user reducer for authentication
  },
});

export default store;

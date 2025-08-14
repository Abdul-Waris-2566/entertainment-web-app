import { createSlice } from '@reduxjs/toolkit';

// Hardcoded demo credentials
const DEMO_USER = {
  email: 'x@mail.com',
  password: 'x123',
};

// Try to load auth state from localStorage
const initialAuth = localStorage.getItem('isAuthenticated');

const initialState = {
  isAuthenticated: initialAuth,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        state.error = 'Invalid email or password, understood ??!!!';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('isAuthenticated');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = userSlice.actions;
export default userSlice.reducer;

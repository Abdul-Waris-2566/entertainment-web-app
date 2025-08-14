import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to load movies from your loader/service
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const res = await fetch('/data.json');
  return await res.json();
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    all: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleBookmark(state, action) {
      const title = action.payload;
      const movie = state.all.find((m) => m.title === title);
      if (movie) {
        movie.isBookmarked = !movie.isBookmarked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.all = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleBookmark } = moviesSlice.actions;
export default moviesSlice.reducer;

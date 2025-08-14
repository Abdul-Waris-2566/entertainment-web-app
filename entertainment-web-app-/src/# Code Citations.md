# Code Citations

## License: unknown

https://github.com/LeoYangFrontend/Neflix_mock/tree/b26a02ae2194ac7a2def0f9164b5e4c212d40b3f/src/features/counter/movieSlice.ts

```
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status =
```

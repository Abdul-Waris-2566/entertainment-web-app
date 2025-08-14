import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, toggleBookmark } from '../store/moviesSlice';

function useToggleMovie() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  // Memoize the handler so its reference doesn't change on every render
  // This is important if you pass it to child components (like <Movie />) to avoid unnecessary re-renders
  const handleToggleBookmark = useCallback(
    (title) => {
      dispatch(toggleBookmark(title));
    },
    [dispatch],
  );

  return { handleToggleBookmark };
}

export default useToggleMovie;

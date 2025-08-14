import React from 'react';
import Movie from '../../UI/Movie';

// Small memoized grid component for recommended movies.
// Keeps rendering isolated: it only re-renders when `movies` or `onToggleBookmark` change.
const RecommendedMovies = React.memo(function RecommendedMovies({
  movies,
  onToggleBookmark,
}) {
  return (
    <div className="grid max-w-[1340px] grid-cols-[repeat(2,_1fr)] gap-4 md:grid-cols-[repeat(3,_1fr)] lg:grid-cols-[repeat(4,_1fr)]">
      {movies.map((movie) => (
        <Movie
          key={movie.title}
          data={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
});

export default RecommendedMovies;

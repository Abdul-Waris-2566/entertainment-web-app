import allMovies from './Movies_data';

// In case data is loaded through data loading feture of react router version 6.4+

export async function seriesLoader() {
  const series = await allMovies();
  return series.filter((series) => series.category === 'TV Series');
}

export async function homepageLoader() {
  const movies = await allMovies();
  return movies;
}

export async function bookmarkedMoviesLoader() {
  const bookmarkedMovies = await allMovies();

  return bookmarkedMovies.filter((movies) => movies.isBookmarked === true);
}

export async function moviesLoader() {
  const movies = await allMovies();
  return movies.filter((movie) => movie.category === 'Movie');
}

import { useState, useCallback } from 'react';
import Movie from '../../UI/Movie';
import Search from '../../UI/Search';
import { useSelector } from 'react-redux';
import useToggleMovie from '../../utils/useToggleMovie';

function Movies() {
  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const allMovies = useSelector((state) => state.movies.all);
  const movies = allMovies.filter((movie) => movie.category === 'Movie');
  const { handleToggleBookmark } = useToggleMovie();

  // Memoize handlers to avoid unnecessary re-renders and function re-creation
  // This is important if these handlers are passed to child components (like <Search />)
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    if (e.target.value.length < 2) setSearchActive(false);
  }, []);

  const handleSearchKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && search.trim().length >= 2) {
        setSearchActive(true);
      }
      if (e.key === 'Backspace' && search.length <= 2) {
        setSearchActive(false);
      }
    },
    [search],
  );

  // Memoize matchesStartOfWord to avoid re-creating the function on every render
  // This is useful if used in array filters or passed to children
  const matchesStartOfWord = useCallback((title, keyword) => {
    const words = title.toLowerCase().split(/\s+/);
    const kw = keyword.toLowerCase();
    return words.some((word) => word.startsWith(kw));
  }, []);

  const filteredMovies =
    searchActive && search.trim().length >= 2
      ? movies.filter((movie) => matchesStartOfWord(movie.title, search.trim()))
      : movies;

  const showSearchTitle = searchActive && search.trim().length >= 2;
  const searchTitle = showSearchTitle
    ? `Found ${filteredMovies.length} results for "${search}"`
    : 'Movies';

  return (
    <div className="h-full w-full overflow-x-hidden">
      <Search
        placeholder="movies"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      <div className="mt-6">
        <section className="movies |">
          <h1 className="text-hd-lg mb-4 font-light">{searchTitle}</h1>
          <div className="grid max-w-[1340px] grid-cols-[repeat(2,_1fr)] gap-4 md:grid-cols-[repeat(3,_1fr)] lg:grid-cols-[repeat(4,_1fr)]">
            {filteredMovies.map((movie) => (
              <Movie
                key={movie.title}
                data={movie}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Movies;

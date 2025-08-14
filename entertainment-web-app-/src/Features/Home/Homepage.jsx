import { useState, useCallback, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Movie from '../../UI/Movie';
import Search from '../../UI/Search';
import Slider from '../../UI/Slider';
import useToggleMovie from '../../utils/useToggleMovie';
import RecommendedMovies from './RecommendedMovies';

function Homepage() {
  // use shallowEqual so the selector doesn't cause re-renders when unrelated parts of state change
  const movies = useSelector((state) => state.movies.all, shallowEqual);
  const { handleToggleBookmark } = useToggleMovie();

  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState(false);

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

  // Memoize derived arrays to keep stable references when inputs don't change
  const filteredMovies = useMemo(() => {
    return searchActive && search.trim().length >= 2
      ? movies.filter((movie) => matchesStartOfWord(movie.title, search.trim()))
      : movies;
  }, [movies, searchActive, search, matchesStartOfWord]);

  const trending = useMemo(
    () => movies.filter((m) => m.isTrending === true),
    [movies],
  );
  const recommended = useMemo(
    () => movies.filter((m) => m.isTrending === false),
    [movies],
  );

  // When searching, show all filtered movies as recommended, hide trending
  const showTrending = !searchActive || search.trim().length < 2;
  const recommendedToShow = useMemo(
    () =>
      searchActive && search.trim().length >= 2 ? filteredMovies : recommended,
    [searchActive, search, filteredMovies, recommended],
  );

  // Title logic
  const showSearchTitle = searchActive && search.trim().length >= 2;
  const searchTitle = showSearchTitle
    ? `Found ${filteredMovies.length} results for "${search}"`
    : 'Recommended for you';

  return (
    <div className="w-full overflow-x-hidden">
      <Search
        placeholder="movies or TV series"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      <div className="content mt-6 flex flex-col gap-8 sm:gap-12">
        {showTrending && (
          <section className="trending |">
            <Slider title="Trending">
              <div className="hide-scrollbar flex gap-6 overflow-x-auto">
                {trending.map((trending) => (
                  <Movie
                    key={trending.title}
                    data={trending}
                    homepage={true}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            </Slider>
          </section>
        )}
        <section className="recommended |">
          <h1 className="text-hd-lg mb-4 font-light">{searchTitle}</h1>
          <RecommendedMovies
            movies={recommendedToShow}
            onToggleBookmark={handleToggleBookmark}
          />
        </section>
      </div>
    </div>
  );
}

export default Homepage;

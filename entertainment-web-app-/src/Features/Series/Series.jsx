import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Search from '../../UI/Search';
import Movie from '../../UI/Movie';
import useToggleMovie from '../../utils/useToggleMovie';

function Series() {
  // const series = useLoaderData();

  const allSeries = useSelector((state) => state.movies.all);
  const series = allSeries.filter((movie) => movie.category === 'TV Series');

  const { handleToggleBookmark } = useToggleMovie();

  const [search, setSearch] = useState();
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

  const filteredSeries =
    searchActive && search.trim().length >= 2
      ? series.filter((item) => matchesStartOfWord(item.title, search.trim()))
      : series;

  const showSearchTitle = searchActive && search.trim().length >= 2;
  const searchTitle = showSearchTitle
    ? `Found ${filteredSeries.length} results for "${search}"`
    : 'TV Series';

  return (
    <div className="h-full w-full overflow-auto">
      <Search
        placeholder="TV Series"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      <div className="mt-6">
        <section className="movies |">
          <h1 className="text-hd-lg mb-4 font-light">{searchTitle}</h1>

          <div className="grid max-w-[1340px] grid-cols-[repeat(2,_1fr)] gap-4 md:grid-cols-[repeat(3,_1fr)] lg:grid-cols-[repeat(4,_1fr)]">
            {filteredSeries.map((series) => (
              <Movie
                key={series.title}
                data={series}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Series;

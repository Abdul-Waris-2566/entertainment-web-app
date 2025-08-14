import IconTVCategory from '../assets/icon-category-tv.svg?react';
import IconMovieCategory from '../assets/icon-category-movie.svg?react';
import IconBookmarkEmpty from '../assets/icon-bookmark-empty.svg?react';
import IconBookmarkFull from '../assets/icon-bookmark-full.svg?react';
import IconPlay from '../assets/icon-play.svg?react';
import React from 'react';

// Memoize Movie to prevent unnecessary re-renders if props do not change
// This is especially useful if parent components re-render often
const Movie = React.memo(function Movie({ data, homepage, onToggleBookmark }) {
  const { category, isTrending, rating, isBookmarked, thumbnail, title, year } =
    data;

  function handleBookmark() {
    onToggleBookmark(title);
  }
  return (
    <div className="relative">
      <div
        className={
          isTrending && homepage
            ? 'with-gradient-overlay group relative h-[180px] w-[280px] rounded-md backdrop-brightness-75 md:h-[230px] md:w-[450px]'
            : 'with-gradient-overlay group relative h-[174px] rounded-md'
        }
      >
        <img
          className="h-full w-full rounded-md object-cover backdrop-brightness-75"
          src={
            isTrending && homepage
              ? thumbnail.trending.large
              : thumbnail.regular.large
          }
          alt="thumbnail"
        />
        <div className="play-button | absolute top-[50%] left-[50%] z-13 hidden h-[48px] w-[120px] translate-[-50%] cursor-pointer items-center gap-3 rounded-3xl bg-white/25 p-3 group-hover:flex">
          <IconPlay />
          <p className="text-hd-sm font-light">Play</p>
        </div>
        <div
          className="bg-greyish-blue/50 absolute top-3 right-4 z-20 rounded-full p-2 hover:cursor-pointer"
          onClick={handleBookmark}
        >
          {isBookmarked ? <IconBookmarkFull /> : <IconBookmarkEmpty />}
        </div>
      </div>
      <div
        title="Info"
        className={isTrending && homepage ? 'absolute bottom-3 left-5' : 'mt-3'}
      >
        <div className="flex items-center gap-2">
          <p className="text-bd-sm font-light text-gray-300">{year}</p>
          <span className="mt-[-8px] text-gray-300">.</span>
          <div>
            {category === 'Movie' ? <IconMovieCategory /> : <IconTVCategory />}
          </div>

          <p className="text-bd-sm font-light text-gray-300">
            {category === 'Movie' ? 'Movie' : 'TV Series'}
          </p>
          <span className="mt-[-8px] text-gray-300">.</span>
          <p className="text-bd-sm font-light text-gray-300">{rating}</p>
        </div>
        <div>
          <h2
            className={
              isTrending && homepage
                ? 'text-hd-md font-semibold'
                : 'text-hd-sm font-light'
            }
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
});

export default Movie;

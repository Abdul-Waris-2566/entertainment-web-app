import IconSearch from '../assets/icon-search.svg?react';

function Search({ placeholder, value, onChange, onKeyDown }) {
  return (
    <div className="flex items-center justify-center gap-5">
      <label htmlFor="search">
        <IconSearch />
      </label>

      <input
        id="search"
        className="text-hd-md focus:border-b-greyish-blue caret-red w-full py-2.5 font-light outline-0 focus:border-b-1"
        type="text"
        placeholder={`Search for ${placeholder}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Search;

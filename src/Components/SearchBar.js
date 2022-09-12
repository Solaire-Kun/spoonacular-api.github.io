import React, { useState } from 'react';
import spoonacular from '../api/spoonacular';
import ItemsList from './ItemsList';
import '../css/SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [emptyQuery, setEmptyQuery] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);

  async function fetchData() {
    try {
      const res = await spoonacular.get(`/recipes/complexSearch?query=${query.query}`);
      res.data?.results?.forEach(item => {
        res.data.results.forEach((item, index) => index <= 1 && setItems([res.data.results]));
        setIsFetching(false);
        console.log(typeof item);
        console.log(item);
      });
      if (res.data.totalResults === 0) {
        setIsFetching(false);
        setNoResults(true);
      };
    } catch(err) {
      setIsFetching(false);
      setFetchError(err);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNoResults(false);
    setEmptyQuery(false);
    setIsFetching(true);
    setFetchError('');
    if (query === '') {
      setEmptyQuery(true);
      setIsFetching(false);
    } else { fetchData(); };
  };

  return (
    <div>
      <div className='flex-column justify-content-center input-group'>
        <form className='form-outline' onSubmit={ handleSubmit }>
            <input
              id='search-box'
              placeholder='Search...'
              className='text-white bg-dark rounded mt-3 mb-3 mx-auto w-75 form-control'
              type="search"
              onChange={ e => setQuery({ query: e.target.value }) }
            />
        </form>
        <h3 className='text-center text-white'>{ isFetching ? 'Please wait...' : '' }</h3>
        <h3 className='text-center text-white'>{ noResults ? 'No results found.' : '' }</h3>
        <h3 className='text-center text-danger'>{ fetchError.length !== 0 && `Failed to get data! ${fetchError}` }</h3>
        <h3 className='text-center text-danger'>{ emptyQuery ? 'Cannot search with an empty search field' : '' }</h3>
      </div>
      <ItemsList items={items} />
    </div>
  );
}

export default SearchBar;
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

  async function fetchData() {
    try {
      await spoonacular.get(`/recipes/complexSearch?&query=${query}`)
      .then (res => {
        setIsFetching(false);
        for(let i = 0; i <= 9; i++) {
          res.data.results.forEach((res, index) => index < 9 && setItems([res]));
          //setItems([res.data.results[1]]);
          console.log(items[i]);
          console.log(typeof items);
        };
      })
    } catch(err) {
      setIsFetching(false);
      setFetchError(err);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmptyQuery(false);
    setIsFetching(true);
    setFetchError('');
    if (query.length === 0) {
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
        <h3 className='text-center text-danger'>{ fetchError.length !== 0 && `Failed to get data! ${fetchError}` }</h3>
        <h3 className='text-center text-danger'>{ emptyQuery ? 'Cannot search with an empty search field' : '' }</h3>
      </div>
      <ItemsList items={items} />
    </div>
  );
}

export default SearchBar;

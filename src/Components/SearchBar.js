import React, { useState } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';
import '../css/SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [items, setItems] = useState([]);
  const [noResults, setNoResults] = useState(false);

  async function fetchData() {
    try {
      const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&apiKey=${process.env.REACT_APP_API_KEY}&diet=vegetarian&query=${query.query}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
        setItems(res.data.results);
        setIsFetching(false);
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
    fetchData();
    setNoResults(false);
    setIsFetching(true);
    setFetchError('');
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
              required
            />
        </form>
        <h3 className='text-center text-white'>{ isFetching ? 'Please wait...' : '' }</h3>
        <h3 className='text-center text-white'>{ noResults ? 'No results found.' : '' }</h3>
        <h3 className='text-center text-danger'>{ fetchError.length !== 0 && `Failed to get data! ${fetchError}` }</h3>
      </div>
      <ItemsList items={items} />
    </div>
  );
}

export default SearchBar;
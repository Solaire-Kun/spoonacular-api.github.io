import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBar from './Components/SearchBar/SearchBar';
import ItemDetails from './Components/ItemDetails/ItemDetails';

function App() {
  return (
    <div>
      <h1 className='pt-2 text-center'>Search Food</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SearchBar /> }></Route>
          <Route path='/details' element={ <ItemDetails /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

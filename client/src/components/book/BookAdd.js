import React, { useState, useEffect } from 'react';
import { searchGoogleBooks } from '../../modules/googleBooksManager';
import NewBook from './NewBook';

const BookAdd = () => {
  const [ books, setBooks ] = useState([]);
  const [ criterion, setCriterion ] = useState("");

  const doBookSearch = (criterion) => {
    searchGoogleBooks(criterion)
      .then((books) => setBooks(books.items));
  };

  useEffect(() => {
    doBookSearch(criterion);
  }, [])

  return (
    <>
      <h1>Book Search</h1>
      <div className='container'>
        <div className="book-search__form">
          <input id="search" value={ criterion } onChange={ e => setCriterion(e.target.value) } />
          <button onClick={ () => doBookSearch(criterion) }>Search</button>
        </div>
        <div className="book-list row justify-content-center">
          { books?.map(book =>
            <NewBook book={ book } key={ book.id } />
          ) }
        </div>
      </div>
    </>
  )
}

export default BookAdd;
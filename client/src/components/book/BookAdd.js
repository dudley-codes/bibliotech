import React, { useState, useEffect } from 'react';
import { searchGoogleBooks } from '../../modules/googleBooksManager';
import Book from './Book';

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
            <Book book={ book.volumeInfo } key={ book.id } />
          ) }
        </div>
      </div>
    </>
  )
}

export default BookAdd;
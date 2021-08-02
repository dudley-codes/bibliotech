import React, { useState, useEffect } from 'react';
import { searchGoogleBooks } from '../../modules/googleBooksManager';
import Button from "react-bootstrap/Button"
import NewBook from './NewBook';
import { Input } from 'reactstrap';

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
      {
        books === undefined || books?.length === 0 ?
          <div className='container'>
            <div className="book-search__form  new-book">
              <div>

                <div className="search-input">
                  <Input id="search" value={ criterion } onChange={ e => setCriterion(e.target.value) } />
                  <Button onClick={ () => doBookSearch(criterion) }>Search</Button>
                </div>
                <div>Search for books to add to your Bookshelf.</div>
              </div>
            </div>
          </div> :
          <div className='container'>
            <div className="book-search__form  search-again">
              <div className="search-input">
                <Input id="search" value={ criterion } onChange={ e => setCriterion(e.target.value) } />
                <Button onClick={ () => doBookSearch(criterion) }>Search</Button>
              </div>
              <div>Not seeing the book you're looking for?</div>
              <div>Try adding the author's name to your search.</div>
            </div>
            <div className="book-list row justify-content-center">
              { books?.map(book =>
                <NewBook book={ book } key={ book.id } />
              ) }
            </div>
          </div>
      }
    </>
  )
}

export default BookAdd;
import React, { useEffect, useState } from "react";
import { getAllBooks, getSearchResults } from "../../modules/bookManager";
import Book from "./Book";
import BookSearch from "./BookSearch";
import { useHistory } from 'react-router-dom';

const BookList = () => {
  const [ books, setBooks ] = useState([]);
  const history = useHistory();
  const { search } = window.location;
  const query = new URLSearchParams(search).get('q');
  const [ searchQuery, setSearchQuery ] = useState(query || '');

  const renderBooks = () => {
    if (searchQuery === '') {
      return getAllBooks().then(b => setBooks(b)).then(() => history.push('/'))
    } else {
      return getSearchResults(searchQuery).then(b => setBooks(b)).then(() => setSearchQuery(''))
    }
  }

  useEffect(() => {
    renderBooks();
  }, [])

  return (
    <>
      <div className='home-container'>
        <div>
          <BookSearch
            searchQuery={ searchQuery }
            setSearchQuery={ setSearchQuery }
            renderBooks={ renderBooks }
          />
          <div className='row justify-content-center book-list'>
            { books.map((book) => (
              <Book book={ book } key={ book.id } />
            )) }
          </div>
        </div>

      </div>
    </>
  )
};

export default BookList;

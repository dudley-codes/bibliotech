import React, { useEffect, useState } from "react";
import { getAllBooks, getSearchResults } from "../../modules/bookManager";
import Book from "./Book";
import BookSearch from "./BookSearch";

const BookList = () => {
  const [ books, setBooks ] = useState([]);
  const { search } = window.location;
  const query = new URLSearchParams(search).get('q');
  const [ searchQuery, setSearchQuery ] = useState(query || '');

  const renderBooks = () => {
    if (searchQuery === '') {
      return getAllBooks().then(b => setBooks(b))
    } else {
      return getSearchResults(searchQuery).then(b => setBooks(b)).then(() => setSearchQuery(''))
    }
  }

  useEffect(() => {
    renderBooks();
  }, [])

  return (
    <>
      <div className=' home-container'>
        <BookSearch
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
        />
        <div>
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

import React, { useState, useEffect } from 'react';
import { searchGoogleBooks } from '../../modules/googleBooksManager';
import Book from './Book';

const BookAdd = () => {

  const [ books, setBooks ] = useState([]);

  const testQuery = "The Power of Habit";

  useEffect(() => {
    searchGoogleBooks(testQuery).then(res => setBooks(res.items));
  }, [])

  const volumeInfo = () => {
    books?.map(book => {
      console.log(book.volumeInfo)
    })
  }

  // volumeInfo();

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          { books?.map(book =>
            <Book book={ book.volumeInfo } key={ book.id } />
          ) }
        </div>
      </div>

    </>
  )
}

export default BookAdd;
import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../modules/bookManager";
import Book from "./Book";

const BookList = () => {
  const [ books, setBooks ] = useState([]);

  const fetchBooks = () => {
    return getAllBooks().then(b => setBooks(b))
  }

  useEffect(() => {
    setTimeout(function () { fetchBooks(); }, 1000)
  }, [])

  return (
    <>
      <h1>Welcome Back!</h1>
      <div className='container'>
        <div className='row justify-content-center'>
          { books.map((book) => (
            <Book book={ book } key={ book.id } />
          )) }
        </div>
      </div>
    </>
  )
};

export default BookList;

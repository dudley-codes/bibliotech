import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../modules/bookManager";
import UserLoanList from "../loan/UserLoanList";
import Book from "./Book";

const BookList = () => {
  const [ books, setBooks ] = useState([]);

  const fetchBooks = () => {
    return getAllBooks().then(b => setBooks(b))
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  return (
    <>
      <div className=' home-container'>
        <div className='row justify-content-center book-list'>
          { books.map((book) => (
            <Book book={ book } key={ book.id } />
          )) }
        </div>
        <div className='user-loan__list'>
          <UserLoanList />
        </div>
      </div>
    </>
  )
};

export default BookList;

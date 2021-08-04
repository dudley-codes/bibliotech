import React, { useEffect, useState } from "react";
import { getAllUserBooks } from "../../modules/bookManager";
import UserLoanList from "../loan/UserLoanList";
import Book from "./Book";

const Bookshelf = () => {
  const [ books, setBooks ] = useState([]);

  const fetchPosts = () => {
    return getAllUserBooks().then(b => setBooks(b))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      {/* <div className='bookshelf'>My Bookshelf</div> */ }
      <div className='container'>
        <div className='row justify-content-center'>
          { books.map((book) => (
            <Book book={ book } key={ book.id } />
          )) }
        </div>
      </div>
      {/* <div className='user-loan__list'>
        <UserLoanList />
      </div> */}
    </>
  )
};

export default Bookshelf;

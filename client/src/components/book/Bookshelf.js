import React, { useEffect, useState } from "react";
import { getAllUserBooks } from "../../modules/bookManager";
import Book from "./Book";

const Bookshelf = () => {
  const [ books, setBooks ] = useState([]);

  const fetchPosts = () => {
    return getAllUserBooks().then(b => setBooks(b))
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <>
      <h1>My Bookshelf</h1>
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

export default Bookshelf;

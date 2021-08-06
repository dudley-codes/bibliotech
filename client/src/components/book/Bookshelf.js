import React, { useEffect, useState } from "react";
import { getAllUserBooks } from "../../modules/bookManager";
import UserLoanList from "../loan/UserLoanList";
import Book from "./Book";
import { Card } from "react-bootstrap";

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
      { books?.length === 0 ?
        <>
          <br />
          <br />
          <Card>
            <Card.Body>
              <div>You don't have any books on your Bookshelf yet.</div>

            </Card.Body>
          </Card>
        </>
        :
        <div className='container'>
          <div className='row justify-content-center'>
            { books.map((book) => (
              <Book book={ book } key={ book.id } />
            )) }
          </div>
        </div>
      }
    </>
  )
};

export default Bookshelf;

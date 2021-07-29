import React, { useEffect, useState } from "react";
import { getAllUserBooks, getBookById } from "../../modules/bookManager";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LoanList from "../loan/LoanList";
import LoanRequest from "../loan/LoanRequest";


const BookDetails = () => {
  const [ book, setBook ] = useState([]);
  const { id } = useParams();
  const [ userBooks, setUserBooks ] = useState([])

  const fetchBook = () => {
    return getBookById(id).then(b => setBook(b))
  }

  useEffect(() => {
    fetchBook();
  }, [])

  const fetchUserBooks = () => {
    getAllUserBooks().then(res => setUserBooks(res))
  }

  useEffect(() => {
    fetchUserBooks()
  }, [])

  //checks to see if a book belongs to user and shows loan button if it does not
  const isMyBook = () => {
    let button = true;
    let bookId = userBooks.find(book => book.id === parseInt(id))

    if (bookId === undefined) {
      button = false;
    }

    return button
  }

  return (
    <>
      <h1>Book Details</h1>
      <div className='container'>
        <div className='row justify-content-center'>
          <Card>
            <Card.Body>
              <img src={ book.thumbnailUrl } alt={ `${ book?.title }` } />
              <h4>Author(s):</h4>
              { book?.authors?.map(a =>
                <h4 key={ a.id }>{ a.name }</h4>
              ) }
              <h4>Owner: { book?.owner?.displayName }</h4>
              <h4>Average Rating: { book?.averageRating }</h4>
              {
                isMyBook() ? null : <LoanRequest fetchBook={ fetchBook } book={ book } />
              }

            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h3>{ book?.title }</h3>
              <h4>{ book?.description }</h4>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <LoanList />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
};

export default BookDetails;

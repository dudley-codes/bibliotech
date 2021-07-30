import React, { useEffect, useState } from "react";
import { deleteBook, getAllUserBooks, getBookById } from "../../modules/bookManager";
import { useParams, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import LoanList from "../loan/LoanList";
import LoanRequest from "../loan/LoanRequest";
import { Button } from "react-bootstrap";

const BookDetails = () => {
  const [ book, setBook ] = useState([]);
  const { id } = useParams();
  const history = useHistory();
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
    let button;
    let bookId = userBooks.find(book => book.id === parseInt(id))

    if (bookId === undefined) {
      button = false;
    } else button = true;

    return button
  }

  //deletes book
  const handleDelete = () => {
    deleteBook(id).then(setTimeout(function () { history.push('/bookshelf'); }, 500))
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
                // Checks to see if book belongs to user. If it does, renders delete button. If not, renders loan request button.
                isMyBook() ? <Button variant="danger" onClick={ handleDelete } >
                  Remove from Bookshelf
                </Button> : <LoanRequest fetchBook={ fetchBook } book={ book } />
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
              {/* Component that lists out loans */ }
              <LoanList />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
};

export default BookDetails;

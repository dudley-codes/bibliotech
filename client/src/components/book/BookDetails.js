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
    deleteBook(id).then(() => history.push('/bookshelf'))
  }

  return (
    <>
      <div className='details-cards__container'>
        <Card>
          <Card.Body className='details-container'>
            <div className='book-container_info'>

              <div className='details-thumb'>
                <img src={ book.thumbnailUrl } alt={ `${ book?.title }` } />
                {
                  // Checks to see if book belongs to user. If it does, renders delete button. If not, renders loan request button.
                  isMyBook() ?
                    <Button variant="danger" onClick={ handleDelete } >
                      Remove from Bookshelf
                    </Button>
                    :
                    <LoanRequest fetchBook={ fetchBook } book={ book } />
                }
              </div>
              <div className='details-title__container'>
                <div><b>{ book.title }</b></div>
                { book?.authors?.map(a =>
                  <div key={ a.id }><em>{ a.name }</em></div>
                ) }
                <div>Owner: { book?.owner?.displayName }</div>
                <div>Avg. Rating: { book?.averageRating }</div>
              </div>
              <div className='description-container'>
                <div>{ book?.description }</div>
              </div>
            </div>
          </Card.Body>
        </Card>


      </div>
    </>
  )
};

export default BookDetails;

import React, { useEffect, useState } from "react";
import { getAllBooks, getBookById } from "../../modules/bookManager";
import Book from "./Book";
import { useParams, Link, useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
// import { Button } from "bootstrap";
import BookRequest from "./BookRequest";
import LoanList from "../loan/LoanList";


const BookDetails = () => {
  const [ book, setBook ] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const fetchPosts = () => {
    return getBookById(id).then(b => setBook(b))
  }

  useEffect(() => {
    fetchPosts();
  }, [])


  return (
    <>
      <h1>Book Details</h1>
      <div className='container'>
        <div className='row justify-content-center'>
          <Card>
            <CardBody>
              <img src={ book.thumbnailUrl } alt={ `Image of ${ book?.title }` } />

              <h4>Author(s):</h4>
              { book?.authors?.map(a =>
                <h4 key={ Math.random() }>{ a.name }</h4>
              ) }
              <h4>Owner: { book?.owner?.displayName }</h4>
              <h4>Average Rating: { book?.averageRating }</h4>
              <h4>Book Status: { book?.onShelf ? 'On Shelf' : 'On Loan' }</h4>
              <BookRequest />

            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3>{ book?.title }</h3>
              <h4>{ book?.description }</h4>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <LoanList />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
};

export default BookDetails;

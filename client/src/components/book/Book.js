import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  //TODO: complete book card

  const thumbnail = () => {
    let thumbnailUrl = '';

    if (book.thumbnailUrl === undefined) {
      thumbnailUrl = book?.imageLinks?.thumbnail
    }
    else {
      thumbnailUrl = book.thumbnailUrl
    }

    return thumbnailUrl
  }
  //todo: add radio selector button to card for books being added to DB
  const Author = () => {
    let bool;
    book.authors?.map(a => {
      if (a.name === undefined) {
        bool = false;
      }
      else bool = true;
    })
    return (
      bool ?
        <>
          { book?.authors?.map(a =>
            <h4 key={ Math.random() }>{ a.name }</h4>
          ) }
        </> :
        <>
          { book?.authors?.map(a =>
            <h4 key={ Math.random() }>{ a }</h4>
          ) }
        </>
    )
  }

  return (
    <>
      <Card>
        <CardBody>
          <img src={ thumbnail() } alt={ `Image of ${ book?.title }` } />
          <h3>{ book?.title }</h3>
          <h4>Author(s):</h4>
          <Author />
          <Link to={ `/book/${ book.id }` }>
            <button className="btn btn-primary" >
              Details
            </button>
          </Link>
        </CardBody>
      </Card>
    </>
  )
};

export default Book;
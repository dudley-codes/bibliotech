import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  //TODO: complete book card
  const Author = () => {

  }
  return (
    <>
      <Card>
        <CardBody>
          <img src={ book.thumbnailUrl } alt={ `Image of ${ book.title }` } />
          <h3>{ book.title }</h3>
          <h4>Author(s):</h4>
          { book.authors.map(a =>
            <h4>{ a.name }</h4>
          ) }
        </CardBody>
      </Card>
    </>
  )
};

export default Book;
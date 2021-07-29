import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { addBook } from "../../modules/bookManager";


const NewBook = ({ book }) => {
  const [ newBook, setNewBook ] = useState({});
  const bookInfo = book.volumeInfo
  const history = useHistory();

  // console.log('book to save', book.volumeInfo.authors)

  const handleSave = (e) => {
    let selectedBookId = e.target.value

    if (selectedBookId === book.id) {
      const authorArray = book.volumeInfo.authors.map(author => { return { name: author } })
      // console.log("authorArray", authorArray)
      addBook({
        title: book.volumeInfo.title,
        thumbnailUrl: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description,
        averageRating: book.volumeInfo.averageRating,
        authors: authorArray
      }).then(history.push('/bookshelf'))
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <img src={ bookInfo?.imageLinks?.thumbnail } alt={ `${ bookInfo?.title }` } />
          <div>{ bookInfo?.title }</div>
          <div>Author(s):</div>
          { bookInfo?.authors?.map(a =>
            <div key={ Math.random() }>{ a }</div>
          ) }
          <Button value={ book.id } onClick={ handleSave }>Add to Bookshelf</Button>
        </Card.Body>
      </Card>
    </>
  )
};

export default NewBook;
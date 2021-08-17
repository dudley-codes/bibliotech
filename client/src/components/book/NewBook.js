import Card from "react-bootstrap/Card";
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { addBook } from "../../modules/bookManager";


const NewBook = ({ book }) => {
  const bookInfo = book.volumeInfo
  const history = useHistory();
  let authorArray = [];

  const handleSave = (e) => {
    let selectedBookId = e.target.value

    if (selectedBookId === book.id) {
      if (book.volumeInfo.authors === undefined) {
        authorArray = [
          {
            name: 'N/A'
          }
        ]
      } else {
        authorArray = book.volumeInfo.authors.map(author => { return { name: author } })
      }
      addBook({
        title: book.volumeInfo.title,
        thumbnailUrl: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description,
        averageRating: book.volumeInfo.averageRating,
        authors: authorArray
      }).then(() => history.push('/bookshelf'))
    }
  }

  return (
    <>
      <Card className="book-card">
        <Card.Body className="book-card__body">
          <img src={ bookInfo?.imageLinks?.thumbnail } alt={ `${ bookInfo?.title }` } />
          <div className="book-info">
            <div className="book-info__title">
              <div>{ bookInfo?.title }</div>
              { bookInfo?.authors?.map(a =>
                <div key={ Math.random() }><em>{ a }</em></div>
              ) }
            </div>
            <Button value={ book.id } onClick={ handleSave } variant='search'>Save Book</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
};

export default NewBook;
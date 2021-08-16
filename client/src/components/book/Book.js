import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Book = ({ book }) => {

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
      return bool
    }
    )
    return (
      bool ?
        <>
          { book?.authors?.map(a =>
            <div key={ Math.random() }>{ a.name }</div>
          ) }
        </> :
        <>
          { book?.authors?.map(a =>
            <div key={ Math.random() }>{ a }</div>
          ) }
        </>
    )
  }

  return (
    <>
      <Card className="book-card">
        <Link to={ `/book/${ book.id }` }>
          <Card.Body className="book-card__body">
            <img src={ thumbnail() } alt={ `${ book?.title }` } />
            <div className='book-info'>
              <div className="book-info__title">
                <div className="title"><b>{ book?.title }</b></div>
                <em> <Author /></em>
                <br />
                <div>Avg. Rating: { book.averageRating }</div>
              </div>

            </div>
          </Card.Body>
        </Link>
      </Card>
    </>
  )
};

export default Book;
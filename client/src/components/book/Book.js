import Card from "react-bootstrap/Card";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import infoButton from '../../images/info.svg'

const Book = ({ book }) => {
  const history = useHistory();
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
        <Card.Body className="book-card__body">
          <img src={ thumbnail() } alt={ `${ book?.title }` } />
          <div className='book-info'>
            <div className="book-info__title">
              <div className="title">{ book?.title }</div>
              <br />
              <Author />
            </div>

          </div>
        </Card.Body>
        <Card.Footer>
          <Link to={ `/book/${ book.id }` } className='info-button'>
            <img src={ infoButton } alt='info button' />
          </Link>
        </Card.Footer>
      </Card>
    </>
  )
};

export default Book;
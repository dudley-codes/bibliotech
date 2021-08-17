import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Input } from 'reactstrap';

const BookSearch = ({ searchQuery, setSearchQuery, doClear }) => {
  const history = useHistory();
  const onSubmit = (e) => {
    history.push(`/search?q=${ searchQuery }`).then(() => setSearchQuery(''))
    e.preventDefault()
  };

  return (
    <div className='search-input_container'>
      <form
        action="/"
        method="get"
        autoComplete="off"
        onSubmit={ onSubmit }
        className='search-input'
      >
        <label htmlFor="header-search">
          <span className="visually-hidden">
            Search user books
          </span>
        </label>
        <Input
          value={ searchQuery }
          onInput={ (e) => setSearchQuery(e.target.value) }
          type="text"
          id="header-search"
          placeholder="Search books"
          name="q"
        />
        <Button className='biblio-submit' variant='search' type="submit">Search</Button>
        <Button variant='cancel' onClick={ () => doClear() }>Clear</Button>
      </form>
    </div>
  );
};

export default BookSearch;

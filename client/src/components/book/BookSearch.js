import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Input } from 'reactstrap';

const BookSearch = ({ searchQuery, setSearchQuery, renderBooks }) => {
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
        <Button type="submit">Search</Button>
        <Button onClick={ () => renderBooks() }>Clear</Button>
      </form>
    </div>
  );
};

export default BookSearch;

import { useHistory } from 'react-router-dom';

const BookSearch = ({ searchQuery, setSearchQuery }) => {
  const history = useHistory();
  const onSubmit = (e) => {
    history.push(`/search?q=${ searchQuery }`).then(() => setSearchQuery(''))
    e.preventDefault()
  };

  return (
    <form
      action="/"
      method="get"
      autoComplete="off"
      onSubmit={ onSubmit }
    >
      <label htmlFor="header-search">
        <span className="visually-hidden">
          Search user books
        </span>
      </label>
      <input
        value={ searchQuery }
        onInput={ (e) => setSearchQuery(e.target.value) }
        type="text"
        id="header-search"
        placeholder="Search videos"
        name="q"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default BookSearch;
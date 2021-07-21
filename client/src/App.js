import logo from './logo.svg';
import './App.css';
import { searchGoogleBooks } from './modules/googleBooksManager';
import React, { useEffect, useState } from 'react';

function App() {
  const [ books, setBooks ] = useState();

  const testQuery = "The Power of Habit";



  useEffect(() => {
    searchGoogleBooks(testQuery).then(res => setBooks(res.items));

  }, [])

  const volumeInfo = () => {
    books?.map(book => {
      console.log(book.volumeInfo.description)
    })
  }

  volumeInfo();

  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

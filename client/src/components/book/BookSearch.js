// import React, { useEffect, useState } from 'react';
// import { searchbooks } from '../modules/bookManager';
// import Book from './Book';

// const BookSearch = () => {
//   const [ books, setbooks ] = useState([]);


//   const doBookSearch = (criterion) => {
//     searchbooks(criterion)
//       .then((books) => setbooks(books));
//   };

//   useEffect(() => {
//     doBookSearch(criterion);
//   }, []);

//   return (
//     <>
//       <h1>Book Search</h1>
//       <div className="book-search__form">
//         <input id="search" value={ criterion } onChange={ e => setCriterion(e.target.value) } />
//         <button onClick={ () => doBookSearch(criterion) }>Search</button>
//       </div>
//       <div className="book-list">
//       { books?.map(book =>
//             <Book book={ book.volumeInfo } key={ book.id } />
//           ) }
//       </div>
//     </>
//   );
// }

// export default BookSearch;
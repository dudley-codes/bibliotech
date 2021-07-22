import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={ isLoggedIn } />
      <ApplicationViews isLoggedIn={ isLoggedIn } />
    </Router>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';
// import { searchGoogleBooks } from './modules/googleBooksManager';
// import React, { useEffect, useState } from 'react';

// function App() {
//   const [ books, setBooks ] = useState();

//   const testQuery = "The Power of Habit";



//   useEffect(() => {
//     searchGoogleBooks(testQuery).then(res => setBooks(res.items));

//   }, [])

//   const volumeInfo = () => {
//     books?.map(book => {
//       console.log(book.volumeInfo.description)
//     })
//   }

//   volumeInfo();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={ logo } className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

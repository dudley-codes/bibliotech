import { getToken } from "./authManager";

const _apiUrl = "/api/book";

//fetches all books from API
export const getAllBooks = () => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//fetches all books from API
export const getSearchResults = (search) => {
  return getToken().then((token) => {
    return fetch(`${ _apiUrl }/search?q=${ search }`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get your search results.");
        }
      });
  });
};

//fetches all books from API
export const getAllUserBooks = () => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetByUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//fetchs book by Id
export const getBookById = (bookId) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/${ bookId }`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};


//Adds new book to API DB
export const addBook = (book) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
  });
};

//Delete book from users profile (soft delete)
export const deleteBook = (id) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/${ id }`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ token }`
      }
    })
  );
}
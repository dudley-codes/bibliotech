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
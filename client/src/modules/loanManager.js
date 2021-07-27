import { getToken } from "./authManager";

const _apiUrl = "/api/loan";

//Adds new book to API DB
export const addLoan = (loan) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loan)
    })
  });
};
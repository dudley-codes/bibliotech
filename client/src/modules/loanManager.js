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

//fetch loan requests for current logged in user
export const getMyLoanReqs = (id) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetByUser/${ id }`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//fetch loan requests for current logged in user
export const updateLoanStatus = (loan) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/${ loan.id }`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loan)
    }));
};
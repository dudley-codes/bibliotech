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

//fetch loan requests made to current logged in user
export const getMyLoanReqs = (id) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetByUser/${ id }`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//fetch all requests made by current logged in user
export const getAllUserLoans = () => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetAllUserRequests`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//fetch loan requests made by current logged in user
export const getLoanRequest = (id) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetLoanRequest/${ id }`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//fetch loan requests made to current logged in user
export const getLoanRequestTo = () => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/LoansToUser/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//Update loan status
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
//cancel loan request
export const cancelLoanRequest = (id) => {
  return getToken().then((token) => {
    fetch(`${ _apiUrl }/${ id }`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ token }`,
        "Content-Type": "application/json"
      }
    })
  })
}

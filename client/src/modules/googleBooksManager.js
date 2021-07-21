const _apiUrl = "https://www.googleapis.com/books/v1/volumes?q="

export const searchGoogleBooks = (query) => {
  return fetch(_apiUrl + query, {
  }).then(resp => resp.json());
};


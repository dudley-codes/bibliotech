import { getToken } from "./authManager";

const _apiUrl = "/api/UserProfile";

//get all users on friends list
export const getAllFriends = () => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetAllFriends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//Get all users not on friends list
export const getNotFriends = () => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/GetNotFriends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }).then(resp => resp.json()));
};

//Add friend to friends list
export const addFriend = (id) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/AddFriend/${ id }`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id)
    }));
};

export const unFriend = (id) => {
  return getToken().then((token) =>
    fetch(`${ _apiUrl }/${ id }`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }));
};
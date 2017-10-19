import { CALL_API } from 'redux-api-middleware';
import { API_URL } from '../config.js'

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_SUCCESS';

export const fetchUsers = () => ({
  [CALL_API]: {
    types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
    endpoint: API_URL+'/users',
    method: 'GET',
  }
});

// dispatch this with {action: "register", userid: result.id}
export const registerUser = (data) => ({
  [CALL_API]: {
    types: [REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE],
    endpoint: API_URL+'/users',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
});

import { CALL_API } from 'redux-api-middleware';
import { API_URL } from '../config.js'

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export const fetchUsers = () => ({
  [CALL_API]: {
    types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
    endpoint: API_URL+'/users',
    method: 'GET',
  }
});

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_SUCCESS';

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

export const PING_USER = 'PING_USER';
export const PING_USER_SUCCESS = 'PING_USER_SUCCESS';
export const PING_USER_FAILURE = 'PING_USER_FAILURE';

export const pingUserAction = (dest_userid) => ({
  [CALL_API]: {
    types: [PING_USER, PING_USER_SUCCESS, PING_USER_FAILURE],
    endpoint: API_URL+'/users',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action: "pinguser", dest_userid: dest_userid})
  }
});

//export const TOKEN_RXD_ACTION = 'TOKEN_RXD_ACTION';
// export const notificationTokenReceived = (token) => (
//   // this should simply save the token into the store for later
//   {
//     type: TOKEN_RXD_ACTION,
//     token: token
//   }
// );

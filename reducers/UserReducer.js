import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  //TOKEN_RXD_ACTION,
} from '../actions/UserActions';

const INITIAL_STATE = { userList: { users: [], error: null, loading: false } };

export function UserReducer(state = INITIAL_STATE, action) {
  let error;
  console.log("UserReducer "+ action.type);
  console.log(action.payload);
  switch(action.type) {

  case FETCH_USERS:
  	return { ...state, userList: { users: [], error: null, loading: true} };
  case FETCH_USERS_SUCCESS:
    return { ...state, userList: { users: action.payload, error: null, loading: false } };
  case FETCH_USERS_FAILURE:
    error = action.payload.data || { message: action.payload.message };
    return { ...state, userList: { users: [], error: error, loading: false } };
  case REGISTER_USER_SUCCESS:
    // maybe log something.
    // but for now we don't need to update the state.
    return state;

  default:
    return state;
  }
}

// export function NotificationTokenReducer (state = {notificationToken: null}, action) {
//     switch(action.type)
//     {
//       case TOKEN_RXD_ACTION:
//         // save token into store for later
//         return { ...state, notificationToken: action.token};
//       default:
//         return state;
//     }
// }

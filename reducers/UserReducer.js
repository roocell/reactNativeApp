import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actions/UserActions';

const INITIAL_STATE = { userList: { users: [], error: null, loading: false } };

export default function(state = INITIAL_STATE, action) {
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


import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigation/AppNavigator';
import UserReducer from './UserReducer'

const DrawerAction = NavigationActions.init()
const DrawerState = AppNavigator.router.getStateForAction(DrawerAction)
const LoginAction = NavigationActions.navigate({routeName: 'Login'})
const initialNavState = AppNavigator.router.getStateForAction(
  LoginAction, // remove login screen for now
  DrawerState
);

function nav(state = initialNavState, action) {
  console.log("nav " + action.type);
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'Second':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Second' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

// reducers are functions that create the new state for the redux store
// each reducer fucntion  get passed it's part of the state
// ie - markers() will get passed state.markers
// so when the components need to access the state be sure to use 'state.markers.pinColor'
const markers = (state = { pinColor: 'red' }, action) => {
    console.log("marker reducer called " + action.type + " pinColor " + state.pinColor);
    switch(action.type)
    {
        case 'ACTION_TOGGLE_PIN_COLOUR':
            if (state.pinColor === 'red') return { ...state, pinColor: 'green' };
            else return { ...state, pinColor: 'red' };
        default:
            return state;
    }
}


const AppReducer = combineReducers({
  nav,
  auth,
  markers,              // if no key set here. then the key is the same. so state.markers
  user: UserReducer,    // the key here 'user' is the state member. so state.user
});

export default AppReducer;

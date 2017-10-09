
import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigation/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = initialNavState, action) {
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
  markers,
});

export default AppReducer;
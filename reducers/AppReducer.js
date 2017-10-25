
import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { markers } from '../components/MainMap';
import { AppNavigator } from '../navigation/AppNavigator';
import { UserReducer, NotificationTokenReducer} from './UserReducer'
import MapReducer from './MapReducer'

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



const AppReducer = combineReducers({
  nav,
  auth,
  MapState: MapReducer,              // if no key set here. then the key is the same. so state.markers
  user: UserReducer,    // the key here 'user' is the state member. so state.user
  //notificationToken: NotificationTokenReducer,
});

export default AppReducer;

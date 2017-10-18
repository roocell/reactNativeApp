import { createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
//import promise from 'redux-promise'; // do we want this middleware too?
import AppReducer from './AppReducer';

// middleware acts between the actions and reducers
// you define the middleware as action functions
// these action functions get dispatched to redux (on componentDidMount or a pull down to refresh)
// which, when complete, will call the reducers, and in turn render the component

// you can apply more than one middleware (react-promise is another)
// by supplying them as extra args to applyMiddleware()
// there are a lot of different things you can do in middleware
// like logging, crash reporting, routing, and handling async requests like we're going to do

// this link explains how to implement your own middleware
// http://rationalappdev.com/storing-data-from-api-with-redux-in-react-native-apps/
// but we're going to use redux-api-middleware which will make it slightly easier to implement

// Here's a decent example to understand how to implement the code
// https://github.com/ashleyw/react-redux-api-middleware-example

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(AppReducer, initialState);
}

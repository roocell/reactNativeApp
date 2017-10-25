/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

//https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-visibletodolist
import { Provider } from 'react-redux' // allows implicit passing of redux store via react context (video 25/26)

import AppWithNavigationContainer from './navigation/AppNavigator';
import configureStore from './reducers/configureStore'
import { API_URL } from './config.js'

export default class App extends Component {

  store = configureStore();


  render() {
      console.log("rendering...");
      // using the react-redux Provider component
      // this provides implicit passing of redux store via react context
      // so we don't have to pass the store down as a prop
      return (
          <Provider store = {this.store}>
            <AppWithNavigationContainer />
          </Provider>
      );
  }

}

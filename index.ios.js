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

export default class reactNativeApp extends Component {

  store = configureStore();

state = {
    markers: [],

    }



    componentDidMount() {
        console.log("compMount");

        fetch('http://192.168.1.225:3001/markers')
        .then( res => res.json() )
        .then (function (res) {
               console.log(res);
               return res; // pass it onto the next .then
               })
        .then( markers => this.setState({markers}))
        .catch(function (err) {
               console.log(err);
               return err;
               });

    }

  render() {
      console.log("rendering...");
      // using the react-redux Provider component
      // this provides implicit passing of redux store via react context
      // so we don't have to pass the store down as a prop
      return (
          <Provider store = {this.store}>
            <AppWithNavigationContainer markers = {this.state.markers} />
          </Provider>
      );
  }

}

AppRegistry.registerComponent('reactNativeApp', () => reactNativeApp);

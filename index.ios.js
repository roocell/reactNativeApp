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
import { createStore } from 'redux'
import { Provider } from 'react-redux' // allows implicit passing of redux store via react context (video 25/26)
import { connect } from 'react-redux' // generates containers for us (video 27)

import AppReducer from './reducers/AppReducer';
import AppWithNavigationContainer from './navigation/AppNavigator';




export default class reactNativeApp extends Component {

  // holds the application current state object
  // for now it's just holding the colour of the pins
  store = createStore(AppReducer);

state = {
    markers: [],
    users: [],


      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: page === 1 ? res.results : [...this.state.data, ...res.results],
              error: res.error || null,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

    componentDidMount() {
        console.log("compMount");

        this.makeRemoteRequest();

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

       fetch('http://192.168.1.225:3001/users')
       .then( res => res.json() )
       .then (function (res) {
              console.log(res);
              return res; // pass it onto the next .then
              })
       .then( users => this.setState({users}))
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
            <AppWithNavigationContainer markers = {this.state.markers} users = {this.state.data}/>
          </Provider>
      );
  }

}

AppRegistry.registerComponent('reactNativeApp', () => reactNativeApp);

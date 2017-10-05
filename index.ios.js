/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

//https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-visibletodolist
import { createStore } from 'redux'
import { Provider } from 'react-redux' // allows implicit passing of redux store via react context (video 25/26)
import { connect } from 'react-redux' // generates containers for us (video 27)

// REDUX note:
/* - write 'container' components to control the behavior of the presentational components.
     - behavior example: what to do for an onClick().
     - containers get the store and pass it as props to the presentation components.
     - containers also dispath 'actions' to the store (which will invoke the 'reducer' functions.
   - write 'presentational' components to control what gets rendered.
     - these have no knowledge of redux stuff so that if you choose to move to Relay.io you don't have to rewrite these.
   - write 'action creator' functions. better to have functions create the actions along with their props
     in case you have another container that also needs to dispatch the same action. It also documents concisely what
     actions your components can dispatch.
*/

import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// reducers are functions that create the new state for the redux store
const marker_reducer = (colour = 'red', action) => {
    console.log("reducer called " + action.type);
    switch(action.type)
    {
        case 'ACTION_TOGGLE_PIN_COLOUR':
            if (colour === 'red') return 'green';
            else return 'red';
        default:
            return colour;
    }
}

// holds the application current state object
// for now it's just holding the colour of the pins
const store = createStore(marker_reducer);

// our new Map react component (ie - a function)
// we need to create our own because we're putting redux magic on top
// this is a 'dumb component' - ie - it only specifies how the current application
// state transforms into renderable output
// also referred to as a 'presentation component'
const MapPresentationComponent = ( {
 markers,
 value,
 pinToggle,
}) => (
       <MapView
       style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
       initialRegion={{
       latitude: 45.3421922,
       longitude: -75.7683456,
       latitudeDelta: 0.007,
       longitudeDelta: 0.007,
       }}
       >
       <MapView.Marker coordinate={{ latitude: 45.3421922, longitude: -75.7683456 }}/>
        {markers.map(marker => (
            <MapView.Marker
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={ marker.title }
            key={ marker.title}
            onPress={pinToggle}
            pinColor = {value}
            />
          ))}
       </MapView>
);

// The container component is auto-generated using the 'connect' function from react-redux
// inside the generated code it will subscribe the render function inside the component
// it will also get the redux state object from the react context

// actions should be defined as function (for reuse by other components)
const pinColorToggleAction = () => ({
  type: 'ACTION_TOGGLE_PIN_COLOUR'
});

// in order to generate the code we have to define the how the state gets mapped to props for the component
// and also tell the component what actions to dispatch
const mapStateToProps = (state, containerProps) => { // container props is always second arg
  return {
     markers: containerProps.markers,
     value: state
  };
}
const mapDispatchToProps = (dispatch, containerProps) => {
  return  {
    pinToggle: () => {
      dispatch(pinColorToggleAction())
    }
  };
}
const MapContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPresentationComponent)

// something wrong with passing markers through here?
const AppContainer = (markers) => (
  <MapContainerComponent markers = {markers}/>
);

export default class reactNativeApp extends Component {

state = {
    markers: []
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
          <Provider store = {store}>
            <MapContainerComponent markers = {this.state.markers}/>
          </Provider>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactNativeApp', () => reactNativeApp);

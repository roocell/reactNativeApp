import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

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


// our new Map react component (ie - a function)
// we need to create our own because we're putting redux magic on top
// this is a 'dumb component' - ie - it only specifies how the current application
// state transforms into renderable output
// also referred to as a 'presentation component'
const MapPresentationComponent = ( {
 markers,
 pinColor,
 navigation,
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
            pinColor = {pinColor}
            />
          ))}
          <Button
            onPress={() => navigation.navigate('DrawerToggle')}
            title='drawer'
          />
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
  console.log("rending map " + state.markers.pinColor);
  return {
     markers: containerProps.screenProps.markers,
     pinColor: state.markers.pinColor,
     navigation: containerProps.navigation
  };
}
const mapDispatchToProps = (dispatch, containerProps) => {
  return  {
    pinToggle: () => {
      dispatch(pinColorToggleAction())
    }
  };
}
// Container
const MainMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPresentationComponent)

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


export default MainMap;

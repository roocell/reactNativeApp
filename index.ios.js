/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
    return (
        <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
          initialRegion={{
            latitude: 45.3421922,
            longitude: -75.7683456,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
            }}
        >
            <MapView.Marker coordinate={{ latitude: 45.3421922, longitude: -75.7683456 }}/>
            {this.state.markers.map(marker => (
                 <MapView.Marker
                   coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                   title={ marker.title }
                   key={ marker.title}
                 />
            ))}
        </MapView>
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

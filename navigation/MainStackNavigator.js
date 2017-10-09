import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainMap from '../components/MainMap';

const MainStackNavigator = StackNavigator({
  MainMap: {
    screen: MainMap,
    navigationOptions: ({navigation}) => ({
      header: null, // don't want a nav header on the map view
    }),
  },

}, {
  initialRouteName: 'MainMap',
  //headerMode: 'screen'
});

export default MainStackNavigator;

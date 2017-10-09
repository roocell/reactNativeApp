import React from 'react';
import { StackNavigator } from 'react-navigation';
import SecondDrawerLinkFirstScreen from '../components/SecondDrawerLinkFirstScreen';
import SecondDrawerLinkSecondScreen from '../components/SecondDrawerLinkSecondScreen';

const SecondStackNavigator = StackNavigator({
  First: { screen: SecondDrawerLinkFirstScreen},
  Second: { screen: SecondDrawerLinkSecondScreen}
}, {
  initialRouteName: 'First',
  //headerMode: 'screen'
});

export default SecondStackNavigator;
